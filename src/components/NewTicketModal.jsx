const NewTicket = ({ticketTitle, handleChangeTitle, ticketDescription, handleChangeDescription, clickCancel, createTicket}) => {

    
    return (
        <div className="h-auto w-3/4 flex items-center flex-col justify-center mb-10 ">
              <input
                type="text"
                className="my-2 h-14 rounded-lg border-transparent border border-gray-300 w-96 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Ticket Title"
                value={ticketTitle}
                onChange={(e) => handleChangeTitle(e)}
              />
              <textarea
                className="flex-1 w-1/2 px-4 py-2 text-lg text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="comment"
                placeholder="TIcket Description"
                rows="3"
                cols="40"
                value={ticketDescription}
                onChange={(e) => handleChangeDescription(e)}
              ></textarea>
              <div className="flex justify-start w-96">
                <button
                  onClick={clickCancel}
                  className=" bg-gray-500 peer hover:bg-gray-700 transition-all rounded-lg font-semibold text-lg  text-white h-12 w-28 m-2"
                >
                  Cancel
                </button>
                <button
                  onClick={createTicket}
                  className=" bg-fuchsia-700 peer hover:bg-fuchsia-800 transition-all hover:rounded rounded-lg font-semibold text-lg  text-white h-12 w-40 m-2"
                >
                  Submit
                </button>
              </div>
            </div>
    )
}

export default NewTicket;