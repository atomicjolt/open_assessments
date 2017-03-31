import React          from 'react';
import _              from 'lodash';
import ReactPaginate  from 'react-paginate';
import MediaTable     from './media_table';

const perPage = 8;

export default class SearchMedia extends React.Component {
  static propTypes = {

  };

  constructor() {
    super();
    // TODO: search
    this.state = {
      searchText: '',
      activeItem: null,
      offset: 0,
    };
  }

  paginateMedia() {
    return _.slice(_.toArray(this.props.media), this.state.offset, this.state.offset + perPage);
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * perPage);
    this.setState({ offset });
  }

  render() {
    return (
      <div className="au-c-wysiwyg-modal__media">
        <div className="au-c-modal-media__search">
          <div className="au-c-input au-c-input--search">
            <label htmlFor="name2" />
            <div className="au-c-input__contain">
              <i className="material-icons">search</i>
              <input className="au-c-text-input au-c-text-input--small" id="name2" type="text" placeholder="Search..." />
            </div>
          </div>
        </div>

        {
          this.props.loading ? 'loading' : <MediaTable
            media={this.paginateMedia()}
            selectItem={id => this.setState({ activeItem: id })}
            activeItem={this.state.activeItem}
          />
        }

        <ReactPaginate
          previousLabel={<i className="material-icons">keyboard_arrow_left</i>}
          nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
          breakLabel={<span>...</span>}
          pageCount={_.size(this.props.media) / 8}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={data => this.handlePageClick(data)}
          containerClassName={'au-c-modal-media__pagination'}
          pageClassName={'au-c-modal-media__pagination-pages'}
          breakClassName={'au-c-modal-media__pagination-break'}
          activeClassName={'au-c-modal-media__pagination-active'}
          previousClassName={'au-c-modal-media__pagination-previous'}
          nextClassName={'au-c-modal-media__pagination-next'}
          pageLinkClassName={'au-c-modal-media__pagination-page'}
        />
      </div>
    );
  }
}
