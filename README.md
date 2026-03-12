# Mapping Sameness Identifier

This repository hosts a formal specification of **Mapping Sameness Identifier**.

## State of publication

The specification is written with [quarto](https://quarto.org/), made available at <https://ts4nfdi.github.io/mapping-sameness-identifier/> and going to be published with DOI when finalized.

Source files:

- `index.qmd`: specification in Quarto Markdown
- `_quarto.yml`: quarto configuration
- `style.css`: additional CSS

Calling `quarto render` or `make` updates the HTML version in directory `docs`.

## Test suite

Directory [examples](examples) contains examples of mappings and corresponding mapping sameness identifiers to be used as test suite for implementations.

