<template>
  <Layout>
    <p class="italic mt-2">A complete list of all Reconcillable Difference's Smoiler Smots.</p>
    <div v-for="show in filteredShows" :key="show.id" class="mt-10 px-4 py-5 border border-gray-700 rounded-lg">
      <h2 v-show="show.node.topic" class="text-2xl">{{ show.node.topic || show.node.title }}</h2>
      <div class="mt-2 flex">
        <div class="px-2 py-1 flex text-xs text-white rounded-full bg-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" width="14" class="mr-1 fill-current">
            <path d="M12.3 70.2c0 28.8 23.4 52.2 52.2 52.2s52.2-23.4 52.2-52.2c0-14.3-5.8-27.4-15.2-36.8l4.1-4.1 1.9 1.9c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-9.5-9.5c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l1.9 1.9-4.5 4.5c-7.6-5.6-16.7-9.1-26.7-9.9v-3.5h9.1c2.3 0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1h-27c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1h9.7v3.5c-27 2.1-48.2 24.6-48.2 52zm52.2-44c24.3 0 44.1 19.8 44.1 44.1s-19.8 44.1-44.1 44.1-44.1-19.8-44.1-44.1c0-24.4 19.8-44.1 44.1-44.1z"/>
            <path d="M64.5 73.6H82c2.3 0 4.1-1.8 4.1-4.1s-1.8-4.1-4.1-4.1H68.6V44.3c0-2.3-1.8-4.1-4.1-4.1s-4.1 1.8-4.1 4.1v25.3c0 2.2 1.8 4 4.1 4z"/>
          </svg>
          <em>{{ show.node.timestamps[0] }}</em>
        </div>
      </div>
      <div class="mt-6">
        <a class="text-blue-700 font-medium outline-none hover:text-blue-800 focus:text-white focus:bg-blue-800" :href="show.node.link">{{ show.node.title }}</a>
      </div>
      <div class="snippet mt-1" v-html="show.node.snippet" />
      <div class="flex">
        <a class="mt-8 px-2 py-1 flex justify-center border-2 border-orange-600 bg-white text-orange-700 rounded outline-none hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white" :href="`https://overcast.fm/${show.node.overcastId}/${show.node.timestamps[0]}`">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="20" class="mr-2 fill-current">
            <path d="M500 900c-221.67 0-400-178.33-400-400s178.33-400 400-400 400 178.33 400 400-178.33 400-400 400zm0-158.33l30-30-30-115-30 115 30 30zM461.67 740l-15 56.67 35-35-20-21.67zm76.66 0l-20 20 35 35-15-55zm28.34 103.33L500 776.67l-66.67 66.66C455 846.67 476.67 850 500 850s45-1.67 66.67-6.67zM500 150c-193.33 0-350 156.67-350 350 0 153.33 98.33 283.33 235 330l75-278.33C443.33 540 433.33 520 433.33 498.33c0-36.66 30-66.66 66.67-66.66s66.67 30 66.67 66.66c0 21.67-10 40-26.67 53.34L615 830c136.67-46.67 235-176.67 235-330 0-193.33-156.67-350-350-350zm228.33 523.33c-8.33 10-23.33 13.34-35 5C681.67 670 680 655 688.33 645c0 0 45-60 45-145s-45-145-45-145c-8.33-10-6.66-25 5-33.33 11.67-8.34 26.67-5 35 5 3.34 3.33 55 71.66 55 173.33 0 101.67-51.66 170-55 173.33zm-121.66-65c-10-10-8.34-28.33 1.66-38.33 0 0 25-26.67 25-70s-25-68.33-25-70c-10-10-10-26.67-1.66-38.33 10-11.67 25-11.67 35-1.67 1.66 1.67 41.66 43.33 41.66 110s-40 108.33-41.66 110c-10 10-25 8.33-35-1.67zm-213.34 0c-10 10-25 11.67-35 1.67-1.66-3.33-41.66-43.33-41.66-110s40-106.67 41.66-110c10-10 26.67-10 35 1.67 10 10 8.34 28.33-1.66 38.33 0 1.67-25 26.67-25 70s25 70 25 70c10 10 11.66 26.67 1.66 38.33zm-86.66 70c-11.67 8.34-26.67 5-35-5-3.34-3.33-55-71.66-55-173.33 0-101.67 51.66-170 55-173.33 8.33-10 23.33-13.34 35-5C318.33 330 320 345 311.67 355c0 0-45 60-45 145s45 145 45 145c8.33 10 5 25-5 33.33zm0 0"/>
          </svg>
          <span class="text-sm">Listen in Overcast</span>
        </a>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  shows: allShows {
    totalCount
    edges {
      node {
        id
        title
        link
        timestamps
        overcastId
        topic
        content
        snippet
        date
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Shows',
    meta: [
      {
        name: 'description',
        content: 'A complete list of all topics covered in the Reconcillable Difference podcast Spoiler Slots.'
      }
    ]
  },

  computed: {
    sortedShows() {
      return this.$page.shows.edges.sort((a, b) => {
        return new Date(b.node.date) - new Date(a.node.date);
      });
    },

    filteredShows() {
      return this.sortedShows.filter(show => show.node.timestamps.length) 
    }
  }
}
</script>

<style>
.snippet code {
  font-size: 14px;
  background-color: #EDF2F7;
  padding: 1px 2px;
}
</style>
