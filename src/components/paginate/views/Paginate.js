import React from "react"
import ReactPaginate from "react-paginate"

const Paginate = props => {
  const { totalPages } = props

  return (
    <ReactPaginate
      containerClassName="pagination unselectable"
      pageClassName="page-item unselectable"
      pageLinkClassName="page-link unselectable"
      previousClassName="page-item unselectable"
      nextClassName="page-item unselectable"
      previousLinkClassName="page-link unselectable"
      nextLinkClassName="page-link unselectable"
      activeClassName="active unselectable"
      breakLabel=""
      nextLabel="&raquo;"
      previousLabel="&laquo;"
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={page => {
        props.onPageChange(page)
      }}
    />
  )
}

export default Paginate
