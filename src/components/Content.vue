<template>
  <v-container class="fill-height"  fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center" @setContents ="setContent">

        <customer-view v-if="value" />

      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import CustomerView from "@/components/customer/CustomerView";
export default {
  name:"Contents",
  components: {CustomerView},
  props:{
    source: String
  },
  data : () =>({
    value :""
  }),
  created() {
      console.log("contents");

  },
  methods:{
    setContent(value){
      this.value = value;

    }
  }
};
</script>
