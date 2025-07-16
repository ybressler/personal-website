# RDiscount Changelog

## Version 2.2.7.3 <small>(December 31, 2023)</small>

* Add Ruby 3.2 and 3.3 to continuous integration
* Reinstate fix for compilation issue with Clang 16

## Version 2.2.7.2 <small>(December 19, 2023)</small>

* Discount upgraded from 2.2.7c -> 2.2.7d
    * Fix compilation on openSUSE Tumbleweed

## Version 2.2.7.1 <small>(June 16, 2023)</small>

* Fix to not filter out `<style>` tags by default in Markdown output,
  unless `filter_styles` is enabled
* Fix compilation issue with Clang 16
* Add TruffleRuby to continuous integration

## Version 2.2.7 <small>(October 23, 2022)</small>

* Discount upgraded from 2.2.0 -> 2.2.7c
    * Implement support for :latex
    * Implement support for :explicitlist
* Move CI to GitHub action and fix CI builds (Ruby 2.7 - 3.1)
* Drop support for all EOL Ruby versions (eg > 2.7)
* Fixing conformance tests to run version 1.0 and 1.0.3

## Version 2.2.0.2 <small>(August 9, 2020)</small>

* Fix compilation error on macOS Big Sur Preview (11.0).
* Enable continuous integration with Ruby 2.4-2.6.
* Builds with Ruby 2.7.0 locally but not on Travis CI.

## Version 2.2.0.1 <small>(May 7, 2016)</small>

* Discount upgraded from 2.1.8 -> 2.2.0
* Fix compilation error on MSVC (Windows).
* Enable continuous integration with Ruby 2.3.0.

## Version 2.1.8 <small>(February 1, 2015)</small>

* Compatible with Ruby 2.2.
* Discount upgraded from 2.1.7 -> 2.1.8
    * GitHub-style language attributes on fenced code blocks.
    * Long numeric list items.
    * Fix footnote numbering inside of nested elements.
    * Fix a bug where autolink + github flavored markdown absorbs the ^C eoln character into a link at the end of a line.

## Version 2.1.7.1 <small>(April 12, 2014)</small>

* Compatible with Xcode 5.1's clang on OS X.

## Version 2.1.7 <small>(October 13, 2013)</small>

* Discount upgraded from 2.1.6 -> 2.1.7
    * GFM fenced code blocks support a language identifier.
* Definition lists:
    * [Discount-style definition lists](http://www.pell.portland.or.us/~orc/Code/discount/#dl)
    * [PHP Markdown Extra definition lists](http://michelf.ca/projects/php-markdown/extra/#def-list)

## Version 2.1.6 <small>(May 28, 2013)</small>

* Discount upgraded from 2.0.7 -> 2.1.6
    * Fenced code blocks
        * backtick-delimited – from GitHub Flavored Markdown
        * tilde-delimited – from PHP Markdown Extra
    * New extensions:
        * `:no_superscript` - Disables superscript processing.
        * `:no_strikethrough` - Disables strikethrough processing.
    * License changed from 4-clause BSD to the more-permissive 3-clause BSD.
    * Fix `--` and `---` to be converted to `&ndash;` and `&mdash;` correctly.
    * Fix handling of tables that have leading and trailing pipe characters.
    * Fix generated table of contents to be valid HTML.
      Handling of special characters in headings is also improved.
    * Fix recognition of HTML tags that contain - or _.

## Version 2.0.7.3 <small>(May 7, 2013)</small>

* Fix usage of deallocated memory when manipulating locale information.
    * Special thanks to Dirkjan Bussink (@dbussink) for identifying this bug and providing the initial fix.
* Fix outdated links. Notably the API reference.
* Setup continuous integration.

## Version 2.0.7.2 <small>(Apr 6, 2013)</small>

* Fix compile error on Windows.
* Disallow install on Ruby 1.9.2, due to known bugs in Ruby.
    * Please upgrade to Ruby 1.9.3 or later.

## Version 2.0.7.1 <small>(Feb 26, 2013)</small>

* Discount upgraded from 2.0.7 (non-final) -> 2.0.7
* Fix encoding of Unicode characters in URLs.

## Version 2.0.7 <small>(Jan 29, 2013)</small>

### New Features

* Discount upgraded from 1.6.8 -> 2.0.7 (non-final)
    * Footnotes - from *PHP Markdown Extra*
    * Superscript tweaks
        * Be more picky about what comes before a ^ if we’re superscripting.
        * Modify superscript grabbing so that it grabs parenthetical and alphanumeric blocks.
    * Other bug fixes
        * Table-of-contents generation will no longer crash for header items containing links.
        * Adjacent new-style [link]s are no longer incorrectly combined.

### Known Issues

* Fails to build with MinGW or MinGW-64.
* Regression: Tags containing dashes and underscores are not escaped correctly.
    * This will be fixed in RDiscount 2.1.5

## Version 1.6.8 <small>(Jan 25, 2011)</small>

* Discount upgraded from 1.6.5 -> 1.6.8
* Fix escaping of tags containing dashes and underscores.

## Earlier Releases

* Inspect the Git history.
