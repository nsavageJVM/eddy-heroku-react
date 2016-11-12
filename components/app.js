import React from 'react'

// const allTicketsUrl = '/api/ticket'

const allTicketsUrl = '/db/tickets'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    const request = new XMLHttpRequest()
    request.open('GET', allTicketsUrl, true)
    request.setRequestHeader('Content-type', 'application/json');

    request.onload = () => {
      if (request.status === 200) {
        this.setState({
          tickets: JSON.parse(request.response)
        });
      }
    }

    request.send();
  }

  render() {
    const tickets = this.state.tickets.map((ticket) => {
      return <li key={ticket.id}>{ticket.title}</li>
    })

    return (
      <div>
        <h3>Tickets</h3>
        <ul>
          {tickets}
        </ul>
      </div>
    )
  }
}

export default App
