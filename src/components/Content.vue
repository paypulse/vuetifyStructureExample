<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <customer-view></customer-view>

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
  }
};
</script>
