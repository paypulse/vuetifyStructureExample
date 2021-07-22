<template>
  <v-container>
    <v-row no-gutters style="position: relative; left: 100px;">
      <h1> 메뉴 관리 </h1>
    </v-row>
    <v-row>
      <v-col>

        <v-treeview
            v-model="selection"
            :items="items"
            :selection-type="selectionType"
            selectable
            return-object
            open-all
            off-icon="mdi-package"
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="pa-6" cols="6">
        <v-btn style="position: relative; left:68%; bottom:25%;" color="primary">추가</v-btn>
        <v-btn style="position: relative; left:69%; bottom:25%;" color="primary">삭제</v-btn>
        <v-form  ref="form" v-model="valid" lazy-validation>
          <!-- 권한 관리 -->
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="상위 메뉴명" required></v-text-field>

        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MenuSetting",
  data: () => ({
    valid: true,
    selectionType: 'leaf',
    selection: [],
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    items: [
      {
        id: 1,
        name: 'Root',
        children: [
          { id: 2, name: 'Child #1' },
          { id: 3, name: 'Child #2' },
          {
            id: 4,
            name: 'Child #3',
            children: [
              { id: 5, name: 'Grandchild #1' },
              { id: 6, name: 'Grandchild #2' },
            ],
          },
        ],
      },
    ]
  }),
  created() {

  }

}
</script>

<style scoped>

</style>
