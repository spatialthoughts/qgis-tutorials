# Makefile for QGIS Tutorials
# Largely adapted from
# https://github.com/qgis/QGIS-Documentation/blob/master/Makefile

# You can set these variables from the command line.
LANGUAGES     = en es
LANG          = en
SPHINXBUILD   = sphinx-build
SPHINXINTL    = sphinx-intl
PAPER         = a4
SOURCEDIR     = source
RESOURCEDIR   = resources
BUILDDIR      = build
SPHINXOPTS    = -D language=$(LANG) -A language=$(LANG) $(SOURCEDIR)

# User-friendly check for sphinx-build
ifeq ($(shell which $(SPHINXBUILD) >/dev/null 2>&1; echo $$?), 1)
$(error The '$(SPHINXBUILD)' command was not found. Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the '$(SPHINXBUILD)' executable. Alternatively you can add the directory with the executable to your PATH. If you don't have Sphinx installed, grab it from http://sphinx-doc.org/)
endif

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS)
# the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) i18n/pot/

.PHONY: help clean html dirhtml singlehtml pickle json htmlhelp qthelp devhelp epub latex latexpdf text man changes linkcheck doctest gettext

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  html       to make standalone HTML files"
	@echo "  pdf        to make standalone PDF  files"
	@echo "  epub       to make an epub"
	@echo "  gettext    to make PO message catalogs"

clean:
	rm -rf $(SOURCEDIR)/static

springclean: clean
	rm -rf $(BUILDDIR)/*
	rm -rf i18n/pot
	find i18n/*/LC_MESSAGES/ -type f -name '*.mo' -delete

localizeresources: springclean
	@echo
	@echo "Removing all static content from $(SOURCEDIR)/static."
	rm -rf $(SOURCEDIR)/static
	@echo "Copy 'en' (base) static content to $(SOURCEDIR)/static."
	mkdir $(SOURCEDIR)/static
	cp -r $(RESOURCEDIR)/en/docs/* $(SOURCEDIR)/static
	@echo "Copy localized '$(LANG)' static content to $(SOURCEDIR)/static."
	@if [ -d "$(RESOURCEDIR)/$(LANG)/docs" ]; then \
		cp -r $(RESOURCEDIR)/$(LANG)/docs/* $(SOURCEDIR)/static; \
	fi

html: localizeresources
	$(SPHINXINTL) build -l $(LANG) -c $(SOURCEDIR)/conf.py
	$(SPHINXBUILD) -b html $(ALLSPHINXOPTS) $(BUILDDIR)/html/$(LANG)
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html/$(LANG)."
pdf:
	$(SPHINXBUILD) -b pdf $(ALLSPHINXOPTS) $(BUILDDIR)/pdf/$(LANG)
	@echo
	@echo "Build finished. The PDF files are in $(BUILDDIR)/pdf/$(LANG)."

epub:
	$(SPHINXBUILD) -b epub $(ALLSPHINXOPTS) $(BUILDDIR)/epub
	@echo
	@echo "Build finished. The epub file is in $(BUILDDIR)/epub."

# For a completely new langugage, run this first
createlang:
	@echo Creating a new Language: $(LANG)
	mkdir -p resources/${LANG}/docs
	mkdir -p i18n/${LANG}/LC_MESSAGES/docs

# Run this for generatig .po files for translation.
pretranslate: gettext
	@echo "Generating the pot files."
	$(SPHINXINTL) update -p i18n/pot -c $(SOURCEDIR)/conf.py -l $(LANG)

gettext:
	rm -rf i18n/pot
	$(SPHINXBUILD) -b gettext $(I18NSPHINXOPTS)
	@echo
	@echo "Build finished. The message catalogs are in $(BUILDDIR)/locale."

# Run this to register .po fles to transifex service
transifex-push:
	$(SPHINXINTL) update-txconfig-resources --p i18n/pot --transifex-project-name qgis-tutorials -c $(SOURCEDIR)/conf.py
	tx push -s

# Run this to pull latest translations from transifex service
transifex-pull:
	tx pull -l $(LANG)

all:
	rm -rf live/
	# Move the localized pdfs to a pdf/ folder within localized html
	mkdir -p live/html
	@echo
	@echo Building html for the following languages: $(LANGUAGES)
	@for LANG in $(LANGUAGES) ; do \
		 make LANG=$$LANG html; \
		 make LANG=$$LANG pdf; \
		 mv $(BUILDDIR)/html/$$LANG live/html/; \
		 mv $(BUILDDIR)/pdf/$$LANG live/html/$$LANG/pdf; \
	done

# Deploying generated files in GitHub pages.
gh-pages:
	git checkout gh-pages
	git checkout master source Makefile resources i18n redirector.html 404.html
	make all
	@for LANG in $(LANGUAGES) ; do \
		rm -rf $$LANG/; \
	done
	mv source/CNAME ./
	mv live/html/* ./
	mv redirector.html index.html
	rm -rf source Makefile $(BUILDDIR) live resources i18n
	git add -A
	git commit -m "Generated gh-pages for `git log master -1 --pretty=short --abbrev-commit`" && git push origin gh-pages ; git checkout master
