/**
 * Triangle Game of Life Animation
 * Reusable component for Hugo static sites
 * 
 * Usage:
 * <div id="triangle-gol-container" data-width="800" data-height="600"></div>
 * <script src="/js/triangle-game-of-life.js"></script>
 */

(function() {
  'use strict';

  class TriangleGameOfLife {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' 
        ? document.getElementById(container) 
        : container;
      
      if (!this.container) {
        console.error('TriangleGameOfLife: Container not found');
        return;
      }

      // Configuration
      this.width = parseInt(this.container.dataset.width) || options.width || 800;
      this.height = parseInt(this.container.dataset.height) || options.height || 600;
      this.triangleSize = options.triangleSize || 15;
      this.spacing = options.spacing || 15;
      this.cellSize = this.triangleSize + this.spacing; // 30px total
      
      // Grid dimensions
      this.gridWidth = Math.floor(this.width / this.cellSize);
      this.gridHeight = Math.floor(this.height / this.cellSize);
      
      // Game state
      this.grid = [];
      this.nextGrid = [];
      this.generation = 0;
      this.animationId = null;
      this.isRunning = false;
      
      // Mouse interaction state
      this.isMouseOver = false;
      this.mouseSpawnInterval = null;
      this.lastMouseRow = -1;
      this.lastMouseCol = -1;
      this.mouseInteractionActive = false; // Track if mouse is actively spawning
      this.generationsSinceMouseLeave = 0; // Track generations since mouse left
      this.mouseCooldownGenerations = 50; // Wait 50 generations after mouse leaves before resuming adaptive rules
      
      // Adaptive rules - start with standard Conway, gradually adapt
      this.adaptationRate = options.adaptationRate || 0.02; // How fast rules adapt (increased)
      this.targetBias = 0; // Starts at 0, increases over time
      this.savedTargetBias = 0; // Save bias when mouse interaction starts
      this.generation = 0;
      this.spawnInterval = 0; // Track when to spawn new triangles
      
      // Target triangle pattern (center of grid) - 15x15 equilateral triangle
      // Center it better vertically - position top of triangle at center minus half height
      this.targetSize = 15; // 15 rows (15x15 triangle - equal width and height)
      // Center vertically: start triangle so it's centered on the board, then move down 2 rows
      this.targetCenterRow = Math.floor((this.gridHeight - this.targetSize) / 2) + 2;
      this.targetCenterCol = Math.floor(this.gridWidth / 2); // Center horizontally
      
      this.init();
    }

    init() {
      // Create SVG container
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('width', this.width);
      this.svg.setAttribute('height', this.height);
      this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
      this.svg.style.display = 'block';
      this.svg.style.cursor = 'crosshair'; // Indicate interactivity
      
      // Add styles
      const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = `
        .triangle-cell {
          fill: white;
          stroke: white;
          stroke-width: 0.5;
          transition: fill 0.2s, stroke 0.2s, opacity 0.2s;
        }
        .triangle-cell.alive {
          fill: #7877c6;
          stroke: #7877c6;
        }
        .triangle-cell.dead {
          opacity: 0;
        }
      `;
      this.svg.appendChild(style);
      
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.id = 'triangle-grid';
      this.svg.appendChild(g);
      this.container.appendChild(this.svg);
      
      // Initialize grids
      this.grid = Array(this.gridHeight).fill(null).map(() => 
        Array(this.gridWidth).fill(false)
      );
      this.nextGrid = Array(this.gridHeight).fill(null).map(() => 
        Array(this.gridWidth).fill(false)
      );
      
      // Create triangle elements
      this.createTriangles();
      
      // Randomly spawn initial pattern
      this.randomSpawn();
      
      // Setup mouse interaction
      this.setupMouseInteraction();
      
      // Start animation
      this.start();
    }

    setupMouseInteraction() {
      // Mouse move handler - spawn triangles as mouse moves
      this.svg.addEventListener('mousemove', (e) => {
        this.handleMouseMove(e);
      });
      
      // Mouse leave handler - stop spawning when mouse leaves
      this.svg.addEventListener('mouseleave', () => {
        this.handleMouseLeave();
      });
      
      // Also handle mouse enter to ensure state is correct
      this.svg.addEventListener('mouseenter', () => {
        this.isMouseOver = true;
        this.mouseInteractionActive = false; // Will be set to true on first mousemove
      });
    }

    handleMouseMove(e) {
      if (!this.isRunning) return;
      
      // Mark mouse interaction as active
      this.mouseInteractionActive = true;
      
      // Get mouse position relative to SVG
      const rect = this.svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Convert to grid coordinates
      const col = Math.floor(x / this.cellSize);
      const row = Math.floor(y / this.cellSize);
      
      // Only spawn if position changed (avoid excessive spawning)
      if (row !== this.lastMouseRow || col !== this.lastMouseCol) {
        this.lastMouseRow = row;
        this.lastMouseCol = col;
        this.spawnAtMouse(row, col);
      }
    }

    spawnAtMouse(row, col) {
      // Spawn a small cluster of triangles around the mouse position
      // This creates a more interesting disruption pattern
      const spawnRadius = 2; // 2-cell radius
      
      for (let dr = -spawnRadius; dr <= spawnRadius; dr++) {
        for (let dc = -spawnRadius; dc <= spawnRadius; dc++) {
          const newRow = row + dr;
          const newCol = col + dc;
          
          // Check bounds
          if (newRow >= 0 && newRow < this.gridHeight && 
              newCol >= 0 && newCol < this.gridWidth) {
            // Spawn with probability based on distance from center
            const distance = Math.sqrt(dr * dr + dc * dc);
            const spawnChance = distance <= 1 ? 0.8 : (distance <= 1.5 ? 0.5 : 0.2);
            
            if (Math.random() < spawnChance) {
              this.grid[newRow][newCol] = true;
              this.updateCell(newRow, newCol, true);
            }
          }
        }
      }
    }

    handleMouseLeave() {
      this.isMouseOver = false;
      this.mouseInteractionActive = false; // Stop active spawning
      this.lastMouseRow = -1;
      this.lastMouseCol = -1;
      // Reset cooldown counter - will start counting from 0
      // Game continues running with pure Conway rules for cooldown period,
      // then adaptive rules resume to guide back to triangle
    }

    createTriangles() {
      const gridGroup = this.svg.querySelector('#triangle-grid');
      
      for (let row = 0; row < this.gridHeight; row++) {
        for (let col = 0; col < this.gridWidth; col++) {
          const x = col * this.cellSize;
          const y = row * this.cellSize;
          
          const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          triangle.id = `tri-${row}-${col}`;
          triangle.className.baseVal = 'triangle-cell dead';
          triangle.setAttribute('d', `M 0,0 L ${this.triangleSize},0 L ${this.triangleSize/2},${this.triangleSize} Z`);
          triangle.setAttribute('transform', `translate(${x},${y})`);
          
          gridGroup.appendChild(triangle);
        }
      }
    }

    randomSpawn() {
      // Spawn random pattern similar to original
      // Create clusters of triangles - increased number
      const numClusters = 15 + Math.floor(Math.random() * 10);
      
      for (let i = 0; i < numClusters; i++) {
        const centerRow = Math.floor(Math.random() * this.gridHeight);
        const centerCol = Math.floor(Math.random() * this.gridWidth);
        const clusterSize = 2 + Math.floor(Math.random() * 5);
        
        // Create small triangle pattern at cluster center
        for (let r = 0; r < clusterSize; r++) {
          for (let c = 0; c <= r; c++) {
            const row = centerRow + r;
            const col = centerCol - Math.floor(r/2) + c;
            
            if (row >= 0 && row < this.gridHeight && 
                col >= 0 && col < this.gridWidth &&
                Math.random() > 0.2) { // 80% chance to spawn (increased from 70%)
              this.grid[row][col] = true;
              this.updateCell(row, col, true);
            }
          }
        }
      }
      
      // Add more scattered individual cells
      const scatterCount = Math.floor(this.gridWidth * this.gridHeight * 0.12); // Increased from 0.05 to 0.12
      for (let i = 0; i < scatterCount; i++) {
        const row = Math.floor(Math.random() * this.gridHeight);
        const col = Math.floor(Math.random() * this.gridWidth);
        if (!this.grid[row][col] && Math.random() > 0.5) { // Increased from 0.7 to 0.5 (50% chance)
          this.grid[row][col] = true;
          this.updateCell(row, col, true);
        }
      }
    }

    isTargetCell(row, col) {
      // Upside-down right triangle: base on top (15 cells), point on bottom (1 cell), height 15 rows
      // Triangle tapers by 1 cell per row from both sides
      const rowOffset = row - this.targetCenterRow;
      const colOffset = col - this.targetCenterCol; // Signed offset (can be negative)
      
      // Check if row is within triangle bounds
      if (rowOffset < 0 || rowOffset >= this.targetSize) {
        return false;
      }
      
      // Calculate width at this row: starts at targetSize (15) at top, decreases by 1 per row
      // Row 0: width = 15, Row 1: width = 14, ..., Row 14: width = 1
      const widthAtRow = this.targetSize - rowOffset;
      
      // Triangle is symmetric, so colOffset must be within the width
      // For row 0 (width 15): cells from -7 to +7 (15 cells: -7,-6,...,-1,0,1,...,6,7)
      // For row 1 (width 14): cells from -6 to +6 (14 cells)
      // For row 14 (width 1): cell at 0 only
      const maxOffset = Math.floor((widthAtRow - 1) / 2);
      
      return Math.abs(colOffset) <= maxOffset;
    }

    countNeighbors(row, col) {
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < this.gridHeight && nc >= 0 && nc < this.gridWidth) {
            if (this.grid[nr][nc]) count++;
          }
        }
      }
      return count;
    }

    shouldBeAlive(row, col, neighbors) {
      const isTarget = this.isTargetCell(row, col);
      const currentlyAlive = this.grid[row][col];
      
      // If mouse interaction is active or in cooldown, use pure Conway rules
      const usePureConway = this.mouseInteractionActive || 
                           (this.generationsSinceMouseLeave < this.mouseCooldownGenerations);
      
      // After generation 100, rules become more aggressive (longer natural game)
      const aggressiveMode = this.generation > 100 && !usePureConway;
      
      // Standard Conway's Game of Life rules
      if (currentlyAlive) {
        // Survival: 2-3 neighbors
        if (neighbors === 2 || neighbors === 3) {
          // In pure Conway mode, all cells survive with 2-3 neighbors
          if (usePureConway) {
            return true;
          }
          // Target cells always survive with 2-3 neighbors
          if (isTarget) {
            return true;
          }
          // Non-target: gradually die off as adaptation increases
          if (aggressiveMode && this.targetBias > 0.2) {
            return Math.random() > (this.targetBias * 0.5);
          }
          return true;
        }
      } else {
        // Birth: exactly 3 neighbors
        if (neighbors === 3) {
          // In pure Conway mode, all cells birth with 3 neighbors
          if (usePureConway) {
            return true;
          }
          // Target cells always birth with 3 neighbors
          if (isTarget) {
            return true;
          }
          // Non-target: less likely to birth as adaptation increases
          if (aggressiveMode && this.targetBias > 0.2) {
            return Math.random() > (this.targetBias * 0.6);
          }
          return true;
        }
      }
      
      // Aggressive adaptive rules for target area (only when not in pure Conway mode)
      if (!usePureConway) {
        if (isTarget) {
          // Target cells with 1-2 neighbors: can survive if adaptation is high
          if (currentlyAlive && (neighbors === 1 || neighbors === 2) && this.targetBias > 0.3) {
            return true;
          }
          // Target cells with 4 neighbors: can survive if adaptation is high
          if (currentlyAlive && neighbors === 4 && this.targetBias > 0.4) {
            return Math.random() > 0.5;
          }
          // Target dead cells with 1-2 neighbors: can be born if adaptation is high
          if (!currentlyAlive && (neighbors === 1 || neighbors === 2) && this.targetBias > 0.5) {
            return Math.random() > 0.6;
          }
          // Target dead cells with 4 neighbors: can be born if adaptation is very high
          if (!currentlyAlive && neighbors === 4 && this.targetBias > 0.7) {
            return Math.random() > 0.7;
          }
        } else {
          // Non-target cells: aggressively die off
          if (currentlyAlive) {
            // With 2 neighbors: die more often as adaptation increases
            if (neighbors === 2 && this.targetBias > 0.2) {
              return Math.random() > (this.targetBias * 0.6);
            }
            // With 4+ neighbors: die more often
            if (neighbors >= 4 && this.targetBias > 0.3) {
              return Math.random() > (this.targetBias * 0.7);
            }
          }
        }
      }
      
      return false;
    }

    updateCell(row, col, alive) {
      const cell = this.svg.querySelector(`#tri-${row}-${col}`);
      if (!cell) return;
      
      if (alive) {
        cell.classList.remove('dead');
        cell.classList.add('alive');
        cell.setAttribute('fill', '#7877c6');
        cell.setAttribute('stroke', '#7877c6');
        cell.setAttribute('opacity', '1');
      } else {
        cell.classList.remove('alive');
        cell.classList.add('dead');
        cell.setAttribute('opacity', '0');
      }
    }

    step() {
      // Update mouse interaction state
      if (this.mouseInteractionActive) {
        // Mouse is active - pause adaptive rules
        this.generationsSinceMouseLeave = 0;
      } else {
        // Mouse not active - count generations since leave
        this.generationsSinceMouseLeave++;
      }
      
      // Only increase adaptation bias if not in mouse interaction or cooldown
      const usePureConway = this.mouseInteractionActive || 
                           (this.generationsSinceMouseLeave < this.mouseCooldownGenerations);
      
      // Check if we're in the post-cooldown period (more aggressive adaptation)
      const postCooldownPeriod = !usePureConway && 
                                 this.generationsSinceMouseLeave >= this.mouseCooldownGenerations &&
                                 this.generationsSinceMouseLeave < this.mouseCooldownGenerations + 50; // First 50 generations after cooldown
      
      if (!usePureConway) {
        // Gradually increase adaptation bias
        // Boost it more aggressively right after cooldown ends to reform triangle faster
        const boostRate = postCooldownPeriod ? this.adaptationRate * 2 : this.adaptationRate;
        this.targetBias = Math.min(1, this.targetBias + boostRate);
      }
      
      this.generation++;
      
      // After 150 generations, start actively spawning triangles in target area (longer natural game)
      // But only if not in mouse interaction or cooldown
      // After cooldown, spawn more frequently to reform triangle
      if (!usePureConway) {
        if (this.generation > 150) {
          // More frequent spawning after cooldown to reform triangle
          const spawnFrequency = postCooldownPeriod ? 5 : 10; // Every 5 generations in post-cooldown period, then every 10
          if (this.generation % spawnFrequency === 0) {
            this.spawnInTargetArea();
          }
        }
      }
      
      // Calculate next generation
      for (let row = 0; row < this.gridHeight; row++) {
        for (let col = 0; col < this.gridWidth; col++) {
          const neighbors = this.countNeighbors(row, col);
          this.nextGrid[row][col] = this.shouldBeAlive(row, col, neighbors);
        }
      }
      
      // Update grid and visuals
      for (let row = 0; row < this.gridHeight; row++) {
        for (let col = 0; col < this.gridWidth; col++) {
          this.grid[row][col] = this.nextGrid[row][col];
          this.updateCell(row, col, this.grid[row][col]);
        }
      }
    }

    spawnInTargetArea() {
      // Spawn triangles in target area to help form the pattern
      // Increase spawn chance after cooldown to reform triangle faster
      const postCooldownPeriod = !this.mouseInteractionActive && 
                                 this.generationsSinceMouseLeave >= this.mouseCooldownGenerations &&
                                 this.generationsSinceMouseLeave < this.mouseCooldownGenerations + 50;
      const baseChance = Math.min(0.3, this.targetBias * 0.4); // Up to 30% chance
      const spawnChance = postCooldownPeriod ? Math.min(0.5, baseChance * 1.5) : baseChance; // Boost to 50% in post-cooldown period
      
      for (let row = 0; row < this.gridHeight; row++) {
        for (let col = 0; col < this.gridWidth; col++) {
          if (this.isTargetCell(row, col) && !this.grid[row][col]) {
            // Check if cell has at least 1 neighbor (to avoid isolated cells)
            const neighbors = this.countNeighbors(row, col);
            if (neighbors >= 1 && Math.random() < spawnChance) {
              this.grid[row][col] = true;
              this.updateCell(row, col, true);
            }
          }
        }
      }
    }

    animate() {
      if (!this.isRunning) return;
      
      this.step();
      this.animationId = setTimeout(() => this.animate(), 100); // 100ms per generation (even faster)
    }

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }

    stop() {
      this.isRunning = false;
      if (this.animationId) {
        clearTimeout(this.animationId);
        this.animationId = null;
      }
    }

    reset() {
      this.stop();
      this.generation = 0;
      this.targetBias = 0;
      
      // Clear grid
      for (let row = 0; row < this.gridHeight; row++) {
        for (let col = 0; col < this.gridWidth; col++) {
          this.grid[row][col] = false;
          this.updateCell(row, col, false);
        }
      }
      
      // Respawn
      this.randomSpawn();
      this.start();
    }
  }

  // Auto-initialize when DOM is ready
  function initAll() {
    const containers = document.querySelectorAll('[id^="triangle-gol"], .triangle-game-of-life');
    containers.forEach(container => {
      if (!container.dataset.initialized) {
        container.dataset.initialized = 'true';
        new TriangleGameOfLife(container);
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Export for manual initialization
  if (typeof window !== 'undefined') {
    window.TriangleGameOfLife = TriangleGameOfLife;
  }

})();

