class PCAFE_SPF_CF7 {
    constructor( options, globalOptions ) {
        this.options = options;
        this.global = globalOptions;
        this.init();
        this.spf_config;
    }
    init() {
        this.combineOptions();
        this.initSmartPhoneField();
    }
    combineOptions() {
        let comOps = this.options;

        if( this.options.config == 'global' ) {
            comOps.initialCountry = this.global.spf_default_country;
            comOps.geoIpLookup = this.global.spf_geoip ? 1 : 0;
            comOps.validation = this.global.spf_frontend_validation ? 1 : 0;
        } 
        
        comOps.countrySearch = this.global.spf_country_search ? 1 : 0;
        comOps.dropdwonCoutnries = this.global.spf_restrict_country ? this.global.spf_restrict_country : '';
        comOps.restrictType = this.global.spf_restrict_type;

        this.spf_config = comOps;
    }
    initSmartPhoneField() {
        if (typeof intlTelInput == 'undefined') {
            return;
        }

        const input = document.querySelector('#' + this.options.inputId);
        const iti = window.intlTelInput(input, this.configuration());

        input.addEventListener('keypress', function(e) {
            var charCode = e.which ? e.which : e.keyCode;
            if (String.fromCharCode(charCode).match(/[^0-9+]/g)) {
                e.preventDefault();
            }
        });

        this.addCountryCodeInputHandler( input, iti );

        input.addEventListener('blur', (e) => {
            this.validateNumber(input, iti);
        }); 

        input.addEventListener('keyup', (e) => {
            this.formatValidation( input, iti );
        });

    }

    configuration() {
        let config = {
            initialCountry: this.spf_config.initialCountry,
            formatOnDisplay: false,
            countrySearch: this.spf_config.countrySearch ? true : false,
            fixDropdownWidth: true,
            nationalMode: false,
            formatAsYouType: false,
            useFullscreenPopup: false,
            autoHideDialCode: false
        };

        if( this.spf_config.restrictType == 'exclude' ) {
            config.excludeCountries = this.spf_config.dropdwonCoutnries;
        } 

        if( this.spf_config.restrictType == 'include' ) {
            config.onlyCountries = this.spf_config.dropdwonCoutnries;
        }

        
        if( this.spf_config.geoIpLookup || this.spf_config.initialCountry == 'auto' ) {
            config.initialCountry = 'auto';
            config.geoIpLookup = function (success, failure) {
                jQuery.get("https://ipinfo.io", function () {}, "jsonp").always(
                    function (resp) {
                        var countryCode =
                            resp && resp.country ? resp.country : "";
                        success(countryCode);
                    }
                );
            };
        }

        return config;
    }

    validateNumber( input, iti ) {
        if( ! this.spf_config.validation ) return;
        const isValid = iti.isValidNumber();

        if( input.value ) {
            if( isValid ) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        } else {
            input.classList.remove('valid');
            input.classList.remove('invalid');
        }
    }

    formatValidation( input, iti ) {
        if( ! this.spf_config.validation ) return;

        const isValid = iti.isValidNumber();

        if( input.value ) {
            if( isValid ) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.remove('invalid');
            }
        } else {
            input.classList.remove('valid');
            input.classList.remove('invalid');
        }
    }

    addCountryCodeInputHandler( inputElement, iti ) {
        const handleCountryChange = (event) => {

            const currentCountryData = iti.getSelectedCountryData();
            const currentCode = `+${currentCountryData.dialCode}`;

            this.updateCountryCodeHandler(event.currentTarget, currentCode);
        }

        inputElement.addEventListener('keydown', handleCountryChange);
        inputElement.addEventListener('input', handleCountryChange);
        inputElement.addEventListener('countrychange', handleCountryChange);
    }

    updateCountryCodeHandler( input, currentCode ) {
        let value = input.value;

        if( currentCode && '+undefined' === currentCode || ['','+'].includes(value) ){
            return;
        }

        if (!value.startsWith(currentCode)) {
            value = value.replace(/\+/g, '');
            input.value = currentCode + value;
        }
    }
}

document.querySelectorAll('.wpcf7-smart_phone_field').forEach(function(input) {

    let globalOptions = pcafe_spf_global_setting;

    let options = {
        inputId: input.getAttribute('id'),
        config: input.getAttribute('data-config'),
        initialCountry: input.getAttribute('data-init_country') ? input.getAttribute('data-init_country') : 'us',
        validation: input.getAttribute('data-fv') ? input.getAttribute('data-fv') : 0,
    };

    new PCAFE_SPF_CF7(options, globalOptions);
});


document.addEventListener( 'wpcf7submit', function( event ) {
    document.querySelectorAll('.wpcf7-smart_phone_field').forEach(function(input) {
        input.classList.remove('invalid');
        input.classList.remove('valid');
    });
}, false );