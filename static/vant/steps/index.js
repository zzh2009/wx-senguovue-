Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: [
    'custom-class'
  ],

  properties: {
    icon: String,
    steps: {
      type: Array,
      observer() {
        this.formatSteps();
      }
    },
    active: {
      type: Number,
      observer() {
        this.formatSteps();
      }
    },
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: '#06bf04'
    }
  },

  attached() {
    this.formatSteps();
  },

  methods: {
    formatSteps() {
      const { steps } = this.data;
      const formattedSteps = steps.map((step, index) => {
        let status = {status:this.getStatus(index)};
        return Object.assign({}, step, status);
      });

      this.setData({
        formattedSteps
      });
    },

    getStatus(index) {
      const { active } = this.data;

      if (index < active) {
        return 'finish';
      } else if (index === active) {
        return 'process';
      }

      return '';
    }
  }
});
