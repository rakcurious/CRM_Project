import Widget from "./Widget";
import openicon from "../assets/openticket.svg";
import progressicon from "../assets/progressticket.svg";
import closedicon from "../assets/closedticket.svg";
import blockedicon from "../assets/blockedticket.svg";

const WidgetsAll = ({ticketStatusCount, data}) => {

    const totalper =
    parseInt(ticketStatusCount.open) +
    parseInt(ticketStatusCount.progress) +
    parseInt(ticketStatusCount.closed) +
    parseInt(ticketStatusCount.blocked);

  const percentages = [
    parseInt((parseInt(ticketStatusCount.open) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.progress) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.closed) * 100) / totalper),
    parseInt((parseInt(ticketStatusCount.blocked) * 100) / totalper),
  ];


    return (
            <div className={`flex justify-around mb-10 flex-wrap ${data ? "": "animate-pulse"}`}>
          <Widget  
            colortop="bg-blue-600"
            colorbottom="bg-blue-500"
            svg={openicon}
            text="Open"
            percentage={percentages[0]}
            barcolor="#1e40af"
            value={ticketStatusCount.open}
          />
          <Widget
            colortop="bg-yellow-600"
            colorbottom="bg-yellow-500"
            svg={progressicon}
            text="Progress"
            percentage={percentages[1]}
            barcolor="#a16207"
            value={ticketStatusCount.progress}
          />
          <Widget
            colortop="bg-green-600"
            colorbottom="bg-green-500"
            svg={closedicon}
            text="Closed"
            percentage={percentages[2]}
            barcolor="#14532d"
            value={ticketStatusCount.closed}
          />
          <Widget
            colortop="bg-neutral-600"
            colorbottom="bg-neutral-500"
            svg={blockedicon}
            text="Blocked"
            percentage={percentages[3]}
            barcolor="#171717"
            value={ticketStatusCount.blocked}
          />
        </div>
    )
}

export default WidgetsAll;