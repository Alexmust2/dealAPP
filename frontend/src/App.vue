<template>
  <div class="amo-crm-container">
    <h1 class="amo-crm-title">amoCRM сделки</h1>
    <a-input v-model="searchQuery" @input="searchLeads" placeholder="Поиск по сделке" />
    <a-table :dataSource="leads" :columns="columns" class="amo-crm-table" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Table, Input } from 'ant-design-vue';
import { Lead, getLeads } from './api';

export default defineComponent({
  components: {
    'a-table': Table,
    'a-input': Input,
  },
  data() {
    return {
      searchQuery: '',
      leads: [] as Lead[],
      columns: [
        {
          title: 'Ответственный',
          dataIndex: 'responsible_user_name',
        },
        {
          title: 'Название',
          dataIndex: 'name',
        },
        {
          title: 'Бюджет',
          dataIndex: 'price',
        },
        {
          title: 'Статус',
          dataIndex: 'status_id',
        },
        {
          title: 'Дата создания',
          dataIndex: 'created_at',
        },
      ],
    };
  },
  mounted() {
    this.searchLeads();
  },
  methods: {
    async searchLeads() {
      try {
        const response = await getLeads(this.searchQuery);
        this.leads = response.data;

        this.leads.forEach((lead: any) => {
          const date: Date = new Date(lead.created_at * 1000);
          const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
          lead.created_at = date.toLocaleDateString("ru", options);
        });
      } catch (error) {
        console.error('Error fetching leads', error);
      }
    },
  },
});
</script>


<style scoped>
.amo-crm-container {
  width: 80%;
  margin: 0 auto;
}

.amo-crm-title {
  text-align: center;
  margin-bottom: 20px;
}

.amo-crm-table {
  border: 1px solid #817e7e5e; 
  border-radius: 8px; 
  overflow: hidden; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
  margin-top: 25px;
}

.amo-crm-table td, .amo-crm-table th {
  padding: 10px;
  text-align: left;
}
</style>
