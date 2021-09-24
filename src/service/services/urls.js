import axios from 'axios';

export const urlService = ({
    getAllLogs: async payload =>
        axios.post(`https://3dj2i3fzi7.execute-api.us-east-2.amazonaws.com/dev/getlogs`, payload),
    getSourceList: async () =>
        axios.get(`https://run.mocky.io/v3/13696953-b887-43d5-8eaf-2f87b0854dd4`),
});

export default urlService;