import axios from 'axios';

export const urlService = axios => ({
    getAllLogs: async payload =>
        axios.get(`https://run.mocky.io/v3/c108f07d-94f2-478b-a69a-c0d4d7b1dcab`),
    getSourceList: async () =>
        axios.get(`https://run.mocky.io/v3/eb610c08-bcbc-4e09-bcc4-9012bc4d8017`),
});

export default urlService(axios);