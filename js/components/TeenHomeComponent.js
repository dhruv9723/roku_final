export default {
    props: ['currentuser'],

    template: `
    <div class="container">
    <!-- render this if we're viewing television or film -->
        <div class="row" v-if="activeMediaType == 'video' && retrievedMedia.length > 0">
            <div class="col-12 order-2 order-md-1 col-md-3 media-container">
                <h4 class="media-title">{{currentMediaDetails.movies_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.movies_storyline"></p>
                <span class="media-time">{{currentMediaDetails.movies_runtime}}</span>
                <span class="media-year">Released in {{currentMediaDetails.movies_year}}</span>
            </div>

            <div class="col-12 order-1 order-md-2 col-md-9 media-container">
                <video autoplay controls muted :src="'video/' + currentMediaDetails.movies_trailer" class="fs-video"></video>
            </div>
        </div>

        <div class="row" v-if="activeMediaType == 'audio' && retrievedMedia.length > 0">
            <div class="col-12 order-2 order-md-1 col-md-6 media-container">
                <h4 class="media-title">{{currentMediaDetails.audio_artist}} * {{currentMediaDetails.audio_title}}</h4>
                <p class="media-details" v-html="currentMediaDetails.audio_storyline"></p>
                <span class="media-year">Released in {{currentMediaDetails.audio_year}}</span>              
            </div>

            <div class="col-12 order-1 order-md-2 col-md-6 audio-wrapper">
                <audio autoplay controls :src="'audio/' + currentMediaDetails.audio_src"/>
                <img :src="'images/audio/' + currentMediaDetails.audio_cover" alt="album art" class="img-fluid"/>
            </div>
        </div>

        <div class="row"> <!-- 2-up for nav and media info -->
            <nav class="col-12 col-sm-3 side-nav">
                <ul class="media-type">
                    <li v-for="media in mediaTypes" :data-type="media.description" @click="loadMedia(null, media.description)">
                        <span>
                            <i v-bind:class="[media.iconClass]"></i>
                        </span>
                        
                        <span class="d-none d-md-block">{{ media.description }}</span>
                    </li>
                </ul>
            </nav>

            <div class="col-12 col-sm-9 media-info">
               
                <div class="thumb-wrapper clearfix">
                    <img v-if="activeMediaType == 'video'" v-for="media in retrievedMedia" :src="'images/video/' + media.movies_cover" alt="media thumb" @click="switchActiveMedia(media)" class="img-thumbnail rounded float-left media-thumb">
                    <img v-if="activeMediaType == 'audio'" v-for="media in retrievedMedia" :src="'images/audio/' + media.audio_cover" alt="media thumb" @click="switchActiveMedia(media)" class="img-thumbnail rounded float-left media-thumb audio-thumb">
                </div>
            </div>       
        </div> <!-- end 2-up for media info -->
    </div>
    `,

    data() {
        return {
            activeMediaType: "video",

            currentMediaDetails: { 
                source: "avengers.mp4",
            },

            mediaTypes: [
                { iconClass: "fas fa-headphones", description: "audio" },
                { iconClass: "fas fa-film", description: "video" },
                { iconClass: "fas fa-tv", description: "television" }
            ],

            retrievedMedia: [],

            vidActive: false
        }
    },

    created: function() {
        console.log('params:', this.$route.params);

        this.loadMedia(null, "video");
    },

    methods: {

        loadMedia(filter, mediaType) {
            if (this.activeMediaType !== mediaType && mediaType !== null) {
                this.activeMediaType = mediaType;
            }

            let url = (filter == null) ? `./admin/index.php?media=${this.activeMediaType}` : `./admin/index.php?media=${this.mediaType}&&filter=${filter}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {                    
                    this.retrievedMedia = data;
                    this.currentMediaDetails = data[0];                    
                })
            .catch(function(error) {
                console.error(error);
            });
        },

        switchActiveMedia(media) {
            console.log(media);

            this.currentMediaDetails = media;
        }
    }
}