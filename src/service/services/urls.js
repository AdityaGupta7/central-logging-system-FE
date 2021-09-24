import axios from 'axios';

export const urlService = ({
    getAllLogs: async payload =>
        axios.get(`https://run.mocky.io/v3/c108f07d-94f2-478b-a69a-c0d4d7b1dcab`),
    getSourceList: async () =>
        axios.get(`https://run.mocky.io/v3/13696953-b887-43d5-8eaf-2f87b0854dd4`),
});

export default urlService;