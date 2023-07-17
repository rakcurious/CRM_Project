import axios from "axios";

const BASE_URL = "" ; //PUT YOUR API URL HERE.

//GET API: Fetchin Tickets Data
export async function fetchTicket() {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/tickets/`,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}

//POST API: Creating(Raising) new tickets
export async function ticketCreation(data) {
  return await axios.post(`${BASE_URL}/crm/api/v1/tickets/`, data, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
}

//PUT API: Updating the ticket details when it gets edited
export async function ticketUpdation(id, selectedCurrTicket) {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/tickets/${id}`,
    selectedCurrTicket,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}
