module github.com/fredricnet/paitheme-demo

go 1.25.3

require github.com/fredricnet/paitheme v1.0.0

// Local development: Using local replace for faster iteration
// To use GitHub version, remove this line and run: hugo mod get -u github.com/fredricnet/paitheme@v1.0.0
replace github.com/fredricnet/paitheme => ../..
