<template>
  <v-container class="grey lighten-4">
    <v-row>
      <h1> 에러 로그 조회 </h1>
    </v-row>
    &nbsp;
    <v-row>
      <v-data-table
          v-model="selected"
          :headers="headers"
          :items="desserts"
          :single-select="singleSelect"
          item-key="name"
          show-select
          class="elevation-1">
        <template v-slot:top>

        </template>
      </v-data-table>
    </v-row>


  </v-container>
</template>

<script>

export default {
  name: "ErrorLogView",
  data: () =>({
    headers: [
      { text: 'No.', align: 'start', sortable: false, value: 'name', width: "10px"},
      { text: 'ID', value: 'calories',width: "80px" },
      { text: 'Phase', value: 'fat',width: "90px"  },
      { text: 'System', value: 'carbs',width: "100px"  },
      { text: 'Server Name', value: 'protein',width: "150px" },
      { text: 'Host Name', value: 'iron',width: "150px" },
      { text: 'URL', value: 'iron',width: "90px" },
      { text: 'Message', value: 'iron',width: "100px" },
      { text: 'Time', value: 'iron',width: "90px" }
    ],
    desserts : []
  }),
  created() {

  }
}
</script>

<style scoped>

</style>
