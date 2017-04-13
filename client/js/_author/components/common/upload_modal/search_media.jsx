import React          from 'react';
import _              from 'lodash';
import ReactPaginate  from 'react-paginate';
import MediaTable     from './media_table';
import Loader         from '../dot_loader';

const perPage = 8;

export default class SearchMedia extends React.Component {
  static propTypes = {
    media: React.PropTypes.shape({}),
    loading: React.PropTypes.bool,
    selectedMediaId: React.PropTypes.string,
    selectMedia: React.PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      searchText: '',
      offset: 0,
    };
  }

  paginateMedia(media) {
    return _.slice(_.toArray(media), this.state.offset, this.state.offset + perPage);
  }

  // TODO: should I use a search library? Or is this fine?
  searchMedia() {
    const { searchText } = this.state;
    if (searchText) {
      return _.filter(this.props.media, item => (
        _.includes(item.description.text, searchText)
        || _.includes(item.altText.text, searchText)
        || _.includes(item.license.text, searchText)
      ));
    }
    return this.props.media;
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * perPage);
    this.setState({ offset });
  }

  render() {
    const filteredMedia = this.searchMedia(this.props.media);

    return (
      <div className="au-c-wysiwyg-modal__media">
        <div className="au-c-modal-media__search">
          <div className="au-c-input au-c-input--search">
            <label htmlFor="name2" />
            <div className="au-c-input__contain">
              <i className="material-icons">search</i>
              <input
                value={this.state.searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                className="au-c-text-input au-c-text-input--small"
                id="name2"
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {
          this.props.loading ? <Loader /> : <MediaTable
            media={this.paginateMedia(filteredMedia)}
            selectMedia={mediaItem => this.props.selectMedia(mediaItem)}
            activeItem={this.state.activeItem}
            selectedMediaId={this.props.selectedMediaId}
          />
        }

        <ReactPaginate
          previousLabel={<i className="material-icons">keyboard_arrow_left</i>}
          nextLabel={<i className="material-icons">keyboard_arrow_right</i>}
          breakLabel={<span>...</span>}
          pageCount={_.size(filteredMedia) / 8}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={data => this.handlePageClick(data)}
          containerClassName={'au-c-modal-media__pagination'}
          pageClassName={'au-c-modal-media__pagination-pages'}
          breakClassName={'au-c-modal-media__pagination-break'}
          activeClassName={'is-active'}
          previousClassName={`au-c-modal-media__pagination-previous ${this.props.loading ? 'inactive' : ''}`}
          nextClassName={`au-c-modal-media__pagination-next ${this.props.loading ? 'inactive' : ''}`}
          pageLinkClassName={'au-c-modal-media__pagination-page'}
        />
      </div>
    );
  }
}
