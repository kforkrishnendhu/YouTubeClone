// let api_key = "AIzaSyDMXHAO3lmCqMl7IDYyCdx_Ts-l726nenQ";
let api_key="AIzaSyCgtWyrKWBHtvIalZPs4t5ZQB07GHFuDMM";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
const videoCardContainer = document.querySelector('.video-container');

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

// const makeVideoCard = (data) => {
//     videoCardContainer.innerHTML += `
//     <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
//         <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//         <div class="content">
//             <img src="${data.channelThumbnail}" class="channel-icon" alt="">
//             <div class="info">
//                 <h4 class="title">${data.snippet.title}</h4>
//                 <p class="channel-name">${data.snippet.channelTitle}</p>
//             </div>
//         </div>
//     </div>
//     `;
// }




const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
                    <div class="col-md-4 col-sm-6 pb-5">
                        <div class="row px-2">
                            <div class="col ratio ratio-16x9" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
                                <img class="video rounded-4" src="${data.snippet.thumbnails.high.url}"> 
                            </div>
                        </div>
                        <div class="row px-2">
                            <div class="col-2">
                                <img class="rounded-circle" width="100%"
                                    src="${data.channelThumbnail}"
                                    alt="">

                            </div>
                            <div class="col-10">
                                <h4 class="Video-title p-0 m-0">${data.snippet.title}</h4>
                            </div>
                        </div>
                        <div class="row px-2">
                            <div class="col-2">
                            </div>
                            <div class="col-10">
                                <p class="channel-views p-0 m-0">${data.snippet.channelTitle}</p>
                                <p class="channel-views p-0 m-0">5.9M View . 9 months ago</p>
                            </div>
                        </div>
                    </div>
                    `;
                }
                