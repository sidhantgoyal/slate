/*
This adds the platform toggle support and turn the language links into a dropdown
*/


'use strict';

( function(global) {

    function selectPlaform(platform) {
        $('.platform-selector button')
            .removeClass('btn-selected')
            .filter('[data-platform-name=\'' + platform + '\']')
            .addClass('btn-selected');
    }

    function setLanguageDropdown(lang) {
        $('.language-dropdown').text(underscoreToDash(lang));
    }

    function underscoreToDash(str) {
        return str.replace('_', '-');
    }

    $(function() {
        $('.platform-selector button').on('click', function() {
            var platform = $(this).data('platform-name');
            console.log(platform);
            if (platform === 'android') {
                window.location = '/android' + window.location.hash;
            } else if (platform === 'web') {
                window.location = '/javascript' + window.location.hash;
            } else if (platform === 'rest') {
                window.location = '/rest' + window.location.hash;
            } else {
                window.location = '/ios' + window.location.hash;
            }
        });

        var path = window.location.pathname;

        if (path.indexOf('android') !== -1) {
            selectPlaform('android');
            /*  
                We need to switch the variable in localStorage which is being set not
                only here but also in pushURL (the first time).
            */
            localStorage.setItem("language", "java");
            /*
                This needs to be done as the languages array has to contain the names of
                all the languages for this view. For the 'iOS' view, the array has only two
                values: objective_c and swift.
            */
            setupLanguages(['java']);
        } else if (path.indexOf('javascript') !== -1) {
            selectPlaform('web');
            localStorage.setItem("language", "javascript");
            setupLanguages(['javascript']);
        } else {
            selectPlaform('ios');
            localStorage.setItem("language", "objective_c");
        }

        var onLoadLang = window.location.search.substr(1);
        if (onLoadLang && (onLoadLang === 'objective_c' || onLoadLang === 'swift')) {
            setLanguageDropdown(onLoadLang);
        }

        // poor man dropdown for languages
        $('.lang-selector').hide();
        $('.language-dropdown').on('click', function() {
            $('.lang-selector').toggle();
        });

        $('.lang-selector a').on('click', function() {
            setLanguageDropdown($(this).text());
            $('.lang-selector').hide();
        });

        $(document).on('click', function(e) {
            if (!$(e.target).is('.language-dropdown')) {
                $('.lang-selector').hide();
            }
        });

        // make objective_c pretty 
        $('.language-dropdown, .lang-selector a').each(function() {
            $(this).text(underscoreToDash($(this).text()));
        })

    });

} )(window);
