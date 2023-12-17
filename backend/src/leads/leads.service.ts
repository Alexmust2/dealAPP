
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LeadsService {
  private amoCRMEndpoint = 'https://alexmust2003.amocrm.ru/api/v4/leads';
  private accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2MTQyYzI0NmFlMzMxNjFkOTNkYTU5MDY4ODlmZjU1ZGRhZjMzZjEyYjVlM2RkNGExM2E0NWU2MDNiMjA3NTkwNDg1MzJlNDJhYTY2MDUzIn0.eyJhdWQiOiI3M2U0MzA5Yi0zOTZlLTQ3MGEtODIxMy0xZDdiNWZkNTkxNGEiLCJqdGkiOiJiNjE0MmMyNDZhZTMzMTYxZDkzZGE1OTA2ODg5ZmY1NWRkYWYzM2YxMmI1ZTNkZDRhMTNhNDVlNjAzYjIwNzU5MDQ4NTMyZTQyYWE2NjA1MyIsImlhdCI6MTcwMjgyNzAxNiwibmJmIjoxNzAyODI3MDE2LCJleHAiOjE3MDI5MTM0MTYsInN1YiI6IjEwNDUxMTEwIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNDU4NDgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.ODaCFKEP21oZ81e8Okib8OSsdC5rt6emtjFycoWV_bnqnh6qmuVDaOzikPHl0Heob9SI2Uja_s4tO3qNCxKGglHG_qkaN1QF30iyt9_pL84Ft0gzkv5qE2cQ_i6eEGMqcHIVPAdS71pt6jpYzgSbm32P4lmS5o56Q7GruRqcIJRj1JdAGk2lyUMiO2IB_FEZHblPh_vg4fWPIZ9Kw_1qLrEM1bskDlZwx7XESXN-CAO72dRuqcJLmonxGocQw-jPwm2jbYerQPEaQOTN6K9B05CfrgepvqsXKc5AreF7knSvNA_HHupKnvhwRLShUA2aZSFBuI5c8RW0O4z7DxK5yQ'
  private amoCRMUsersEndpoint = 'https://alexmust2003.amocrm.ru/api/v4/users'
  private leads = []

  async getLeads(query?: string): Promise<any> {
    try {
      const url = query ? `${this.amoCRMEndpoint}?query=${query}` : this.amoCRMEndpoint;
      const leadsResponse = await axios.get(url, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      if(leadsResponse.data._embedded) {
        this.leads = leadsResponse.data._embedded.leads;

        const leadsWithNames = await Promise.all(this.leads.map(async (lead) => {
          const userUrl = `${this.amoCRMUsersEndpoint}/${lead.responsible_user_id}`;
          const userResponse = await axios.get(userUrl, {
            headers: { Authorization: `Bearer ${this.accessToken}` },
          });

          return {
            ...lead,
            responsible_user_name: userResponse.data.name,
          };
        }));

        return leadsWithNames;
      }
    } catch (error) {
      console.error('Error fetching leads from amoCRM', error);
      throw error;
    }
  }
}
