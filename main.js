const app = new Vue({
    el: '#app',
    data: {
        VIN: '',
        error: '',
        result: null,
        loading: false,
    },
    methods: {
        async decodeNow() {
            if (this.VIN) {
                this.VIN = this.VIN.trim();
                try {
                    this.error = '';
                    this.result = null;
                    if(this.VIN.length !== 17) throw new Error("VIN has to be a 17 digit alphanumeric string.")
                    this.loading = true;
                    window.scrollTo(0, document.body.scrollHeight + 100);
                    const response = await fetch(`/api?id=${this.VIN}`);
                    if (response.ok) {
                        const result = await response.json();
                        this.loading = false;
                        this.result = result;
                    } else {
                        const result = await response.json();
                        this.loading = false;
                        this.error = result.message;
                    }
                } catch (err) {
                    this.error = err.message;
                }
            } else {
                this.error = "VIN is a required field."
            }
        },
    },
});
