import React, { Component } from 'react'

class Paginate extends Component {
  state = {
    pager: {
      pages: Math.ceil(Number(this.props.totalCustomers/this.props.limit))
    }
  }

  render() {
    const { actual } = this.props

    // Previous button
    const btnPrevious = (actual > 1) ? <button type="button" className="btn btn-success mr-2" onClick={this.props.PreviousPage}>&laquo; Previous</button> : ''

    // Next button
    const {pages} = this.state.pager
    const btnNext = (actual !== pages) ? <button type="button" className="btn btn-success ml-2" onClick={this.props.NextPage}>Next &raquo;</button> : ''

    return (
      <div className="mt-5 mb-5 d-flex justify-content-center">
        {btnPrevious}
        {btnNext}
      </div>
    )
  }
}

export default Paginate
