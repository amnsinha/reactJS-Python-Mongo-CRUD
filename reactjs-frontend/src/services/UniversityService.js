import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:5000/university";

class UniversityService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }


    searchUniversity(keyword){
        return axios.get(USER_API_BASE_URL + '/search/' + keyword);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUniversity(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUniversity(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UniversityService()