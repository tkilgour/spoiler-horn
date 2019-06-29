<template>
  <Layout>
    <h1>Spoiler Slots</h1>
    <div v-for="show in filteredShows" :key="show.id">
      <a :href="show.node.link">{{ show.node.title }}</a>
      <div>{{ show.node.timestamps[0] }}</div>
      <a :href="`https://overcast.fm/itunes1001591287/reconcilable-differences/${show.node.id}/${show.node.timestamps[0]}`">Listen to Spoiler Timestamp on Overcast</a>
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
        content
        date
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Spoiler Slots'
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
