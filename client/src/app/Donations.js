import axios from "axios";
class DonationClass {
  constructor() {} //eslint-disable-line

  createDonation(donation, files) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/donations/enlist", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(donation),
        });
        await response.json().then(async (data) => {
          if (response.status === 201) {
            resolve(data);
            axios
              .post(`/api/donations/upload/images/${data._id}`, files, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((data) => {
                console.log(data);
              })
              .catch((error) => console.log(error));
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserDonations() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/donations/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getDonations() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/donations/", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteDonations(donation) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/donations", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: donation._id,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(donation);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  updateDonation(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`api/donations/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            isDonated: true,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default DonationClass;
