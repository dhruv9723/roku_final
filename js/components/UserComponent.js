export default {
    props: ['liveuser'],

    template: `
    <div class="col-xs-12 col-sm-6 col-md-4 mx-auto">
        <div class="card rounded" @click="navToUserHome(liveuser.access)">
            <div class="card-body text-center">
                <img :src="'images/' + liveuser.avatar" class="rounded-circle img-fluid">
                <p>{{ liveuser.username }}</p>
            </div>
        </div>
    </div>`,

    created: function() {
      console.log(this.liveuser.avatar);
        if (this.liveuser.avatar == null) {
          console.log(this.liveuser.avatar);
            this.liveuser.avatar = "parent.png";
        }
    },

    methods: {
        navToUserHome(access) {
                   console.log(access);
                   if(access == 3){
            this.$router.push({ name: "teen", params: { currentuser: this.liveuser } });
        }else{

            this.$router.push({ name: "home", params: { currentuser: this.liveuser } });
        }
            localStorage.setItem("cachedUser", JSON.stringify(this.liveuser));
        }
    }
}
