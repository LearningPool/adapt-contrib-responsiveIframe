/*
* adapt-contrib-responsiveIframe
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kevin Corry <kevinc@learningpool.com>
*/
define([
  'coreJS/adapt',
  'coreViews/componentView'
], function (Adapt, ComponentView) {

  class ResponsiveIframe extends ComponentView {

    events() {
      return {
        'inview': 'inview'
      }
    }

    preRender() {
      this.listenTo(Adapt, 'device:changed', this.resizeControl);

      this.checkIfResetOnRevisit();

      // Set the title of the IFRAME
      var iframeTitle = this.model.get('displayTitle') || this.model.get('title');
      this.model.set("iframeTitle", iframeTitle);
    }

    checkIfResetOnRevisit() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    postRender() {
      this.$('.responsiveiframe__iframe').ready(() => {
        this.resizeControl(Adapt.device.screenSize);
        this.setReadyStatus();
      });
    }

    inview(event, visible) {
      if (visible) {
        this.setCompletionStatus();
      }
    }

    resizeControl(size) {
      var width = this.$('.responsiveiframe__iframe').attr('data-width-' + size);
      var height = this.$('.responsiveiframe__iframe').attr('data-height-' + size);
      this.$('.responsiveiframe__iframe').width(width);
      this.$('.responsiveiframe__iframe').height(height);
    }

  };

  Adapt.register("responsiveIframe", ResponsiveIframe);

});
