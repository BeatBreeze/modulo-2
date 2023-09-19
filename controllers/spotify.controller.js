const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_SPOTIFY_ID,
  clientSecret: process.env.CLIENT_SPOTIFY_SECRET,
});
const genresData = [
  {
    name: "acoustic",
    image_url: "https://www.adorama.com/alc/wp-content/uploads/2020/12/man-playing-acoustic-guitar-1280x720.jpg"
  },
  {
    name: "afrobeat",
    image_url: "https://i.ytimg.com/vi/1o0JqgNESfw/maxresdefault.jpg"
  },
  {
    name: "alt-rock",
    image_url: "https://res.cloudinary.com/shotgun/image/upload/v1641341763/production/artworks/WhatsApp_Image_2022-01-04_at_20.27.11_kdxvgl.jpg"
  },
  {
    name: "alternative",
    image_url: "https://i.ytimg.com/vi/MCrS4CsqqDs/maxresdefault.jpg"
  },
  {
    name: "ambient",
    image_url: "https://i.ytimg.com/vi/DZpPhCGoPLg/maxresdefault.jpg"
  },
  {
    name: "anime",
    image_url: "https://cdn.pixabay.com/photo/2023/03/21/12/21/anime-wallpaper-7867145_1280.jpg"
  },
  {
    name: "black-metal",
    image_url: "https://cuarteldelmetal.com/wp-content/uploads/2022/03/BlackBraid-Black-Metal-Nativo-estadounidense-single-River-Time-Flows-Through-Me.jpg"
  },
  {
    name: "bluegrass",
    image_url: "https://www.nwahomepage.com/wp-content/uploads/sites/90/2023/07/the-duttons-2.jpg?w=1280"
  },
  {
    name: "blues",
    image_url: "https://ychef.files.bbci.co.uk/1280x720/p02rfmcy.jpg"
  },
  {
    name: "bossanova",
    image_url: "https://i.ytimg.com/vi/m2tC8UlJ9gM/maxresdefault.jpg"
  },
  {
    name: "brazil",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/170123172258-rio-carnival.jpg?q=x_3,y_156,h_1684,w_2993,c_crop/h_720,w_1280"
  },
  {
    name: "breakbeat",
    image_url: "https://wallpaperaccess.com/full/6348370.jpg"
  },
  {
    name: "british",
    image_url: "https://images.wallpaperscraft.com/image/single/flag_britain_eagle_27256_1280x720.jpg"
  },
  {
    name: "cantopop",
    image_url: "https://miro.medium.com/v2/resize:fit:1400/0*cQoaLFS1-MLBPWdD.jpg"
  },
  {
    name: "chicago-house",
    image_url: "https://i.ytimg.com/vi/mTccQN3I_ug/maxresdefault.jpg"
  },
  {
    name: "children",
    image_url: "https://camisetazas.files.wordpress.com/2015/11/1280x720-k2j.jpg"
  },
  {
    name: "chill",
    image_url: "https://i.vimeocdn.com/video/1143311133-6c8f689073c9a466bf7d92bec8fbed613613d6a6bb2740ed39d06bc4a6d07e37-d?f=webp"
  },
  {
    name: "classical",
    image_url: "https://wallpaperswide.com/download/classical_music-wallpaper-1280x720.jpg"
  },
  {
    name: "club",
    image_url: "https://images.hdqwalls.com/download/hi-ibiza-night-club-2r-1280x720.jpg"
  },
  {
    name: "comedy",
    image_url: "https://i.ytimg.com/vi/y-aCdc0_Q0Q/maxresdefault.jpg"
  },
  {
    name: "country",
    image_url: "https://nhpbs.org/images/hero/1280/country-music-vanilla-20190621.jpg"
  },
  {
    name: "dance",
    image_url: "https://wallpaperaccess.com/full/5428294.jpg"
  },
  {
    name: "dancehall",
    image_url: "https://i.ytimg.com/vi/ytCD7RtWrgA/maxresdefault.jpg"
  },
  {
    name: "death-metal",
    image_url: "https://www.elpais.com.co/resizer/YajNIN5B2ikkis-eIFP-37ZNsow=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/2DBDP4QPRBBHROBGZ7RS4WNS7A.jpg"
  },
  {
    name: "deep-house",
    image_url: "https://i.ytimg.com/vi/qvqWzlc16nA/maxresdefault.jpg"
  },
  {
    name: "detroit-techno",
    image_url: "https://i.ytimg.com/vi/tb1xHD7cM0c/maxresdefault.jpg"
  },
  {
    name: "disco",
    image_url: "https://www.themoviedb.org/t/p/original/hsExnzxtgMOyew6uI1NwOD7Pu04.jpg"
  },
  {
    name: "disney",
    image_url: "https://fotografias.antena3.com/clipping/cmsimages01/2021/03/17/FB570D80-0BBD-4734-87A0-3160DEEF6A44/69.jpg?crop=1000,563,x0,y2&width=1280&height=720&optimize=low&format=webply"
  },
  {
    name: "drum-and-bass",
    image_url: "https://cdn.wallpapersafari.com/68/67/UDR6iK.jpg"
  },
  {
    name: "dub",
    image_url: "https://images.wallpaperscraft.com/image/single/vinyl_record_player_vinyl_record_hand_126766_1280x720.jpg"
  },
  {
    name: "dubstep",
    image_url: "https://fmdelta903.com/images/Delta/Noticias/Skrillex-4.jpg"
  },
  {
    name: "edm",
    image_url: "https://img5.goodfon.com/original/1280x720/c/49/marshmello-edm-didzhei-dj.jpg"
  },
  {
    name: "electro",
    image_url: "https://4kwallpapers.com/images/wallpapers/dj-electronic-music-dark-black-background-amoled-1280x720-1943.jpg"
  },
  {
    name: "electronic",
    image_url: "https://images.hdqwalls.com/download/daft-punk-5k-dx-1280x720.jpg"
  },
  {
    name: "emo",
    image_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a5b55018-c9ce-4ca7-839f-35409fa803c6/dfyhjrv-bc2b940b-3853-4682-a25b-0801b092d094.png/v1/fill/w_1280,h_720,q_80,strp/emo_red_wallpaper_by_xxtenshidarkxx_dfyhjrv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvYTViNTUwMTgtYzljZS00Y2E3LTgzOWYtMzU0MDlmYTgwM2M2XC9kZnloanJ2LWJjMmI5NDBiLTM4NTMtNDY4Mi1hMjViLTA4MDFiMDkyZDA5NC5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.O2xu8Xno-ustyJ3zED84Y4WDefjNFWOAR_otwaVfGWE"
  },
  {
    name: "folk",
    image_url:"https://cflvdg.avoz.es/sc/EhT__ossFlVg-NmpFSkJoedibJA=/1280x/2019/03/29/00121553857021608376857/Foto/folk.jpg"
  },
  {
    name: "forro",
    image_url: "https://i.ytimg.com/vi/KG8DbDb0Qns/maxresdefault.jpg"
  },
  {
    name: "french",
    image_url: "https://i.ytimg.com/vi/_w9oCFqrpqc/maxresdefault.jpg"
  },
  {
    name: "funk",
    image_url: "https://i.ytimg.com/vi/hceNBCnOx44/maxresdefault.jpg"
  },
  {
    name: "garage",
    image_url: "https://pbs.twimg.com/ext_tw_video_thumb/1513169733880881172/pu/img/6XQmoXaRrQdKFXBD.jpg:large"
  },
  {
    name: "german",
    image_url: "https://i.ytimg.com/vi/Ha9Q5wysZrk/maxresdefault.jpg"
  },
  {
    name: "gospel",
    image_url: "https://i.ytimg.com/vi/VQYKs9DKTn8/maxresdefault.jpg"
  },
  {
    name: "goth",
    image_url: "https://cdn.wallpapersafari.com/52/73/VDtmHi.jpg"
  },
  {
    name: "grindcore",
    image_url: "https://i.ytimg.com/vi/pISTInvq-a4/maxresdefault.jpg"
  },
  {
    name: "groove",
    image_url: "https://assets.vogue.com/photos/60381ecf8a100a177dd6010d/16:9/w_1280,c_limit/RRxBM-L6-1-Vertical%20(1).jpg"
  },
  {
    name: "grunge",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/110921074043-kurt-cobain.jpg?q=x_106,y_274,h_2250,w_4000,c_crop/h_720,w_1280"
  },
  {
    name: "guitar",
    image_url: "https://i.ytimg.com/vi/8wcR-80SkO4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgWSg_MA8=&rs=AOn4CLCaBbIBTgH9FlR0J-hPA5gprwf28Q"
  },
  {
    name: "happy",
    image_url: "https://i.ytimg.com/vi/yo98coMdEKs/maxresdefault.jpg"
  },
  {
    name: "hard-rock",
    image_url: "https://fotografias.antena3.com/clipping/cmsimages02/2017/07/10/0797C6EF-9FDC-42ED-8614-49E7B47CAC61/69.jpg?crop=2000,1125,x0,y107&width=1280&height=720&optimize=low&format=webply"
  },
  {
    name: "hardcore",
    image_url: "https://thehill.com/wp-content/uploads/sites/2/2022/09/SouthSuburbiaPhoto20220910-Sonic-17.jpg?w=1280"
  },

  {
    name: "harstyle",
    image_url: "https://i.ytimg.com/vi/wg_Vcl4oVxs/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGCEgEyh_MA8=&rs=AOn4CLC7tSQC0vQpMQoiZbA6DhYG9NSRfA"
  },
  {
    name: "heavy-metal",
    image_url: "https://i0.wp.com/rockandblog.net/wp-content/uploads/2023/03/1OeC9CGtWcM-1.jpg?fit=1280%2C720&ssl=1"
  },
  {
    name: "hip-hop",
    image_url: "https://www.semana.com/resizer/PDZqyPG2wswmC63UtbsopC3tOFI=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/OO2SK6DUZNEHRDTEWQZ63OUCMY.jpg"
  },
  {
    name: "holidays",
    image_url: "https://media.cntraveler.com/photos/5991d94d2761d54e0354ca3c/16:9/w_1280,c_limit/Optimal-Vacation_GettyImages-824071670.jpg"
  },

  {
    name: "honky-tonk",
    image_url: "https://www.tollwood.de/wp-content/uploads/2022/10/tollwood-winterfestival-2022-hexenkessel-honkytonk-five.jpg"
  },
  {
    name: "house",
    image_url: "https://i.ytimg.com/vi/5EC4BynJ1MA/maxresdefault.jpg"
  },
  {
    name: "idm",
    image_url: "https://idmmag.com/wp-content/uploads/2021/05/suntree.png"
  },
  {
    name: "indian",
    image_url: "https://i.ytimg.com/vi/ThmoP7aJFyo/maxresdefault.jpg"
  },
  {
    name: "indie",
    image_url: "https://image.ondacero.es/clipping/cmsimages02/2022/08/25/D73BB569-EC81-485B-9042-54D7C8FAA193/viva-suecia_69.jpg?crop=6097,3430,x0,y529&width=1280&height=720&optimize=low&format=webply"
  },

  {
    name: "indie-pop",
    image_url: "https://www.musicaalternativablog.com/wp-content/uploads/2021/06/the_marias.jpg"
  },
  {
    name: "industrial",
    image_url: "https://i.ytimg.com/vi/jRxt9jcwUMI/maxresdefault.jpg"
  },
  {
    name: "iranian",
    image_url: "https://i.ytimg.com/vi/94OLIeXNuu0/maxresdefault.jpg"
  },
  {
    name: "j-dance",
    image_url: "https://pbs.twimg.com/media/Eb7tMvRXYAINI7H.jpg:large"
  },
  {
    name: "j-idol",
    image_url: "https://www.nippon.com/en/ncommon/contents/series/128486/128486.jpg"
  },

  {
    name: "j-pop",
    image_url: "https://i.ytimg.com/vi/3m0aUZ4jvEY/maxresdefault.jpg"
  },
  {
    name: "j-rock",
    image_url: "https://i.ytimg.com/vi/6gRQkEmXoXY/maxresdefault.jpg"
  },
  {
    name: "jazz",
    image_url: "https://abcmallorcastorage.blob.core.windows.net/images/2014/08/jazz-clubs-mallorca.jpg"
  },
  {
    name: "k-pop",
    image_url: "https://media.vogue.mx/photos/5f6942ce34165d6b9efb28d8/16:9/w_1280,c_limit/bts-k-pop.jpg"
  },
  {
    name: "kids",
    image_url: "https://www.themoviedb.org/t/p/original/2Ne8sYfnnRVl9BaghudN8bSkMnW.jpg"
  },
  {
    name: "latin",
    image_url: "https://i.ytimg.com/vi/bpqPxrnUydI/maxresdefault.jpg"
  },
  {
    name: "alatino",
    image_url: "https://elpuertoactualidad.es/wp-content/uploads/2019/08/puro-latino-viernes-fb-1-1280x720.jpg"
  },
  {
    name: "malay",
    image_url: "https://i.ytimg.com/vi/Zc6vS1uuOE4/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgWShIMA8=&rs=AOn4CLDC1T1VyKE2ne57PQF9QU_gUiwL2g"
  },
  {
    name: "mandopop",
    image_url: "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/images/methode/2016/07/06/6ce848c6-3f33-11e6-8294-3afaa7dcda6c_486x.JPG?itok=2iRSM25R"
  },
  {
    name: "metal",
    image_url: "https://i.ytimg.com/vi/R5-8JpdRQdk/maxresdefault.jpg"
  },
  {
    name: "metal-misc",
    image_url: "https://coolwallpapers.me/picsup/5745186-band-music-wallpapers.jpg"
  },
  {
    name: "metalcore",
    image_url: "https://i.postimg.cc/VN8znhqK/IMG-2427-2.jpg"
  },
  {
    name: "minimal-techno",
    image_url: "https://growsoundmag.com/wp-content/uploads/2016/03/940812_1082140805150997_8004579570376975443_n-1280x720.jpg"
  },
  {
    name: "movies",
    image_url: "https://www.inoutviajes.com/fotos/20/19495_z1920-hanszimmerxiwc.jpg"
  },
  {
    name: "mbp",
    image_url: "https://i.ytimg.com/vi/DHzIeaOjplc/maxresdefault.jpg"
  },
  {
    name: "new-age",
    image_url: "https://cdn.eso.org/images/screen/potw2010a.jpg"
  },
  {
    name: "new-release",
    image_url: "https://music.mxdwn.com/wp-content/uploads/2022/11/When-We-Were-Young-Festival-2022_BRING-ME-THE-HORIZON_JH_24-1280x720.jpg"
  },
  {
    name: "opera",
    image_url: "https://www.mundoplus.tv/wp-content/uploads/2023/04/Filmin-Licue.jpg"
  },
  {
    name: "pagode",
    image_url: "https://vejario.abril.com.br/wp-content/uploads/2023/07/MARISA-MONTE-Show-Portas-4-cre%CC%81dito-Leo-Aversa.jpg.jpg?quality=70&strip=info&w=1280&h=720&crop=1"
  },
  {
    name: "party",
    image_url: "https://i.ytimg.com/vi/5XI5QB6k120/maxresdefault.jpg"
  },
  {
    name: "philippines-opm",
    image_url: "https://punto.com.ph/wp-content/uploads/2022/09/Punto-Thumbnail-25.png"
  },
  {
    name: "piano",
    image_url: "https://cdn.pixabay.com/photo/2016/03/06/05/03/piano-1239729_1280.jpg"
  },
  {
    name: "pop",
    image_url: "https://originalmusic.es/wp-content/uploads/estilos-musicales-pop-1280x720.jpg"
  },
  {
    name: "pop-film",
    image_url: "https://i.pinimg.com/originals/30/5d/2d/305d2d872225f1b773fd51cf9409ce52.jpg"
  },
  {
    name: "post-dubstep",
    image_url: "https://i.pinimg.com/originals/1f/53/79/1f53795cbaafebd5b60d2c821152b754.jpg"
  },
  {
    name: "power-pop",
    image_url: "https://cdn.mos.cms.futurecdn.net/tAQXhLKJDjpL6MfzKR2Vxc.jpg"
  },
  {
    name: "progressive-house",
    image_url: "https://www.allfest.es/wp-content/uploads/2019/11/maxresdefault.jpg"
  },
  {
    name: "psych-rock",
    image_url: "https://f4.bcbits.com/img/0028406656_150.jpg"
  },
  {
    name: "punk",
    image_url: "https://indiehoy.com/wp-content/uploads/2018/09/punks-1280x720.jpg"
  },
  {
    name: "punk-rock",
    image_url: "https://i.ytimg.com/vi/webo_uNOe68/maxresdefault.jpg"
  },
  {
    name: "r-n-b",
    image_url: "https://i0.wp.com/urbjournal.com/wp-content/uploads/2021/12/MV5BMGJlMWJiNGYtZTlkNi00Y2MxLTliMzQtMDg2ODk3YTZjMjJlXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg?fit=1280%2C720&ssl=1"
  },
  {
    name: "rainy-day",
    image_url: "https://images.hdqwalls.com/download/another-rainy-day-4k-5i-1280x720.jpg"
  },
  {
    name: "reggae",
    image_url: "https://images.hdqwalls.com/download/bob-marley-abstract-4k-mq-1280x720.jpg"
  },
  {
    name: "reggaeton",
    image_url: "https://indiehoy.com/wp-content/uploads/2019/07/norwegian-reggaeton-1280x720.jpg"
  },
  {
    name: "road-trip",
    image_url: "https://media.gq.com.mx/photos/6006efe4136a880326643744/16:9/w_1280,c_limit/ROAD%20TRIP.jpg"
  },
  {
    name: "rock",
    image_url: "https://wallpaperswide.com/download/metal_rock_band-wallpaper-1280x720.jpg"
  },
  {
    name: "rock-n-roll",
    image_url: "https://euskalpmd.akamaized.net/vod/geozone0/images/0000005524/0000005524_638046251001632259_0008_1280x720.jpg"
  },
  {
    name: "rockabilly",
    image_url: "https://www.salonsecret.es/img/articulos/vuelven-los-peinados-rockabilly-para-hombres.jpg"
  },
  {
    name: "romance",
    image_url: "https://images.hdqwalls.com/download/a-lofi-romance-db-1280x720.jpg"
  },
  {
    name: "sad",
    image_url: "https://image.winudf.com/v2/image/Y29tLmhkd2FsbHBhcGVyY3JlYXRvcnMuc2FkaGR3YWxscGFwZXJzX3NjcmVlbl8wXzE1MTE3MDM4OThfMDA5/screen-0.webp?fakeurl=1&type=.webp"
  },
  {
    name: "salsa",
    image_url: "https://i.ytimg.com/vi/Pb0sJSkAaUA/maxresdefault.jpg"
  },
  {
    name: "samba",
    image_url: "https://patch.com/img/cdn20/users/26509437/20230515/052607/samba___15172605916.jpg"
  },
  {
    name: "sertanejo",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjii9CNIV4dUv7U0eHPnNDbHJMr7Ebd_WtTg&usqp=CAU"
  },
  {
    name: "show-tunes",
    image_url: "https://www.slantmagazine.com/wp-content/uploads/2006/03/showtunes-1280x720.jpg"
  },
  {
    name: "singer-songwriter",
    image_url: "https://imagenes.20minutos.es/files/image_990_v3/uploads/imagenes/2023/03/23/la-cantante-londinense-birdy-tocando-el-piano.jpeg"
  },
  {
    name: "ska",
    image_url: "https://www.am.com.mx/u/fotografias/m/2022/5/6/f1280x720-352438_484113_5050.jpg"
  },
  {
    name: "sleep",
    image_url: "https://i.ytimg.com/vi/njHvGxZgTPk/maxresdefault.jpg"
  },
  {
    name: "songwriter",
    image_url: "https://www.newmexicopbs.org/wp-content/uploads/2017/05/jet-tile2.jpg"
  },
  {
    name: "soul",
    image_url: "https://ychef.files.bbci.co.uk/1280x720/p021ym2q.jpg"
  },
  {
    name: "soundtracks",
    image_url: "https://mott.pe/noticias/wp-content/uploads/2017/08/los-mejores-soundtracks-de-series-y-peliculas-1280x720.jpg"
  },
  {
    name: "spanish",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdq1PGh3PDoslA52mqy8Ouja9EwM93VCCTgA&usqp=CAU"
  },
  {
    name: "study",
    image_url: "https://youthincmag.com/wp-content/uploads/2021/07/education-concept-student-studying-brainstorming-campus-concept-close-up-students-discussing-their-subject-books-textbooks-selective-focus-1280x720.jpg"
  },
  {
    name: "summer",
    image_url: "https://images.wallpapersden.com/image/download/island-summer-sky_ZmtnZmuUmZqaraWkpJRmZ21lrWxnZQ.jpg"
  },
  {
    name: "swedish",
    image_url: "https://indiehoy.com/wp-content/uploads/2018/04/abba-1280x720.jpg"
  },

  {
    name: "synth-pop",
    image_url: "https://img2.wallspic.com/crops/1/9/3/4/4/144391/144391-graphics-light-stage-graphic_design-synth_pop-1280x720.jpg"
  },
  {
    name: "tango",
    image_url: "https://image.ondacero.es/clipping/cmsimages01/2018/01/10/D8A811A0-8F7B-485D-B421-6F8A49A94E96/69.jpg?crop=1190,669,x0,y40&width=1280&height=720&optimize=low&format=webply"
  },
  {
    name: "techno",
    image_url: "https://beatburguer.com/wp-content/uploads/2022/10/Beatburguer_PacoOsuna_2.jpg"
  },
  {
    name: "trance",
    image_url: "https://i0.wp.com/loudcave.es/wp-content/uploads/2021/01/maxresdefault-7.jpg?fit=1280%2C720&ssl=1"
  },
  {
    name: "trip-hop",
    image_url: "https://s1.1zoom.me/big0/370/359600-blackangel.jpg"
  },
  {
    name: "turkish",
    image_url: "https://balkaninsight.com/wp-content/uploads/2022/01/h_00588010-1280x720.jpg"
  },
  {
    name: "work-out",
    image_url: "https://media.cnn.com/api/v1/images/stellar/prod/230609104300-03-teens-exercise-summer-dangers-workout-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill"
  },
  {
    name: "world-music",
    image_url: "https://s1.1zoom.me/big0/907/350123-sepik.jpg"
  }
];
spotifyApi
  .clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch((err) =>
    console.log("The error while searching artists occurred: ", err)
  );

module.exports.search = (req, res) => {
  let Artists;
  let Tracks;
  let Albums;
  // - ARTISTS
  spotifyApi
    .searchArtists(req.query.search)
    .then((artists) => {
      Artists = artists.body.artists.items;
    })
    // - TRACKS
    .then(() => {
      spotifyApi.searchTracks(req.query.search).then((tracks) => {
        Tracks = tracks.body.tracks.items;
      });
    })
    // - ALBUMS
    .then(() => {
      spotifyApi.searchAlbums(req.query.search).then((albums) => {
        Albums = albums.body.albums.items;
        res.render("music/search", {
          artists: { Artists: Artists, Tracks: Tracks, Albums: Albums },
        });
      });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
};

module.exports.albums = (req, res) => {
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then((data) => {
      const httpHeader = res.req.rawHeaders.find((header) =>
        header.startsWith("http")
      );
      res.render("music/albums", {
        albums: data.body.items,
        artist: data.body.items[0].artists[0].name,
        httpHeader: httpHeader,
      });
    })
    .catch((err) =>
      console.log("The error while searching albums occurred: ", err)
    );
};

module.exports.tracks = (req, res) => {
  spotifyApi
    .getAlbum(req.params.id)
    .then((album) => {
      const httpHeader = res.req.rawHeaders.find((header) =>
        header.startsWith("http")
      );
      res.render("music/tracks", {
        tracks: album.body.tracks.items,
        AlbumInfo: album.body,
        httpHeader: httpHeader,
      });
    })
    .catch((err) =>
      console.log("The error while searching albums occurred: ", err)
    );
};
/*Géneros musicales*/
module.exports.genres = (req, res) => {
  spotifyApi.getAvailableGenreSeeds().then(
    function (data) {
      let genreSeeds = data.body.genres;
      res.render("music/genres", { genreSeeds: genreSeeds });
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};
/*Búsqueda por un Género*/
module.exports.oneGenres = (req, res) => {
  const genreId = req.params.id; // El parámetro :id de la URL
  // Aquí puedes buscar la URL de la imagen correspondiente al género en genresData
  const genre = genresData.find(genre => genre.name === genreId);
  if (!genre) {
    // Manejar el caso en el que el género no se encuentre en la lista genresData
    return res.status(404).send('Género no encontrado');
  }

  spotifyApi
    .getRecommendations({
      min_energy: 0.4,
      seed_genres: [genreId],
      min_popularity: 50,
    })
    .then(
      function (data) {
        let recommendations = data.body;
        res.render("music/oneGenres", {
          tracks: recommendations.tracks,
          nameGenre: genre.name,
          genreImage: genre.image_url // Pasa la URL de la imagen del género a la vista
        });
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
};

module.exports.oneArtist = (req, res) => {
  const httpHeader = res.req.rawHeaders.find((header) =>
    header.startsWith("http")
  );
  let Artists;
  spotifyApi
    .getArtist(req.params.id)
    .then(function (artist) {
      Artists = artist.body;
    })
    .then(() => {
      spotifyApi.getArtistAlbums(req.params.id).then((albums) => {
        res.render("music/artists", {
          Info: { Artists: Artists, Albums: albums.body.items },
          httpHeader: httpHeader,
        });
      });
    })
    .catch((err) =>
      console.log("The error while searching artist occurred: ", err)
    );
};
/*Géneros más populares*/
module.exports.home = (req, res) => {
  let charts;
  let strongest;
  let instrumentals;
  let workouts;
  //Charts//
  spotifyApi
    .getRecommendations({
      seed_genres: "chill,techno,house,metal,hardstyle",
      min_popularity: 75,
      limit: 10,
    })
    .then((data) => {
      charts = data.body.tracks;
    })
    //strongest//
    .then(() => {
      spotifyApi
        .getRecommendations({
          seed_genres: "hardstyle",
          min_tempo: 150,
          popularity: 55,
          limit: 9,
        })
        .then((data) => {
          strongest = data.body.tracks;
        });
      //RoofTop vibes//
      spotifyApi
        .getRecommendations({
          seed_genres: "chill",
          min_tempo: 100,
          popularity: 65,
          limit: 9,
        })
        .then((data) => {
          instrumentals = data.body.tracks;
        });
      //Workouts//
      spotifyApi
        .getRecommendations({
          seed_genres: "edm,electro,dance,dancehall,house",
          min_tempo: 128,
          popularity: 65,
          limit: 9,
        })
        .then((data) => {
          workouts = data.body.tracks;
          res.render("home", {
            charts: charts,
            strongest: strongest,
            instrumentals: instrumentals,
            workouts: workouts,
          });
        });
    });
};
