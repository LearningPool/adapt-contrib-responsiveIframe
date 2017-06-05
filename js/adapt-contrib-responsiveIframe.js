/**
 * adapt-contrib-responsiveIframe
 * License - http://github.com/adaptlearning/adapt_framework/LICENSE
 * Maintainers - Kevin Corry <kevinc@learningpool.com>
 */
define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var ResponsiveIframe = ComponentView.extend({

        events: {
            'inview': 'onInview'
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeControl);
        },

        postRender: function() {
            var that = this;
            this.$('.responsiveIframe-iframe').ready(function() {
                that.resizeControl(Adapt.device.screenSize);
                that.setReadyStatus();
            });
            this.$('.responsiveIframe-iframe').load(function() {
                that.isInteraction = this.contentWindow.ActionCompletion ? true : false;
            });
            //listen for the ifarme actions complation.
            this.$('.responsiveIframe-iframe').on('completion:status', _.bind(this.iframeEventCompletion, this));
        },

        onInview: function(event, visible, visiblePartX, visiblePartY) {
            if (!this.isInteraction) {
                if (visible) {
                    if (visiblePartY === 'top') {
                        this._isVisibleTop = true;
                    } else if (visiblePartY === 'bottom') {
                        this._isVisibleBottom = true;
                    } else {
                        this._isVisibleTop = true;
                        this._isVisibleBottom = true;
                    }

                    if (this._isVisibleTop && this._isVisibleBottom) {
                        this.$('.component-widget').off('inview');
                        this.setCompletionStatus();
                    }
                }
            }
        },

        iframeEventCompletion: function(event, complationStatus) {
            if (complationStatus) {
                this.setCompletionStatus();
            }

        },

        resizeControl: function(size) {
            var width = this.$('.responsiveIframe-iframe').attr('data-width-' + size);
            var height = this.$('.responsiveIframe-iframe').attr('data-height-' + size);
            this.$('.responsiveIframe-iframe').width(width);
            this.$('.responsiveIframe-iframe').height(height);
        }

    });

    Adapt.register("responsiveIframe", ResponsiveIframe);

});