/*const Modal = ({handleClose, show, children}) => {*/
function Modal({handleClose, show, children, info}){

        const displayBlockOrNone = show ? "customModal display-block" : "customModal display-none";
    return(
        <div className={displayBlockOrNone}>
        <section className="modal-main">
            {children}
            <input type="button" value="Close sep" onClick={handleClose}/>
        </section>
        </div>
    );
}

function withSubscription (WrappedComponent, endpoint){

    return class extends React.Component {

        constructor(props) {

            super(props);

            this.state = {
                source: [],
            }
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            const apiUrl = 'https://api.jikan.moe/v3/search/anime?q=Ghibli&page=1';
            fetch(endpoint).then((res) => res.json())
            .then((source) => this.setState(source: source.results))

        }



        handleChange() {
           /* this.setState({
                data: selectData(DataSource, this.props)
            })*/
        }

        render(){
            return(<WrappedComponent data={this.state.source} {...this.props} />);
        }
    };// end return function withSubscription
}




class Display extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            show: false,
            info: '',
            data: [],
            filters: '',
            sort:'^',

        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
    console.log('Mounted');
    const options = [];
    const apiUrl = 'https://api.jikan.moe/v3/search/anime?q=Ghibli&page=1';
    fetch(apiUrl)
      .then((response) =>
        response.json()
      )
      .then(this.onLoad)/*this.setState*/

      /*.then((data) =>{
        this.setState({
            data:data.results
        })
        console.log('This is your data 2',
        this.state.data)
      })*/
    }

    parseData(data){

        let arr = data;
        /*const {filters} = this.state;
        const {sort} = this.state;

        if(filters.length){
            console.log('line 63: ' )
            arr = data.filter(item => item.title.toLowerCase().includes(filters.toLowerCase));
        }*/

        return arr;
    }

    onLoad(data){
        this.setState({ data:this.parseData(data.results) })

    }

    showModal(e){

        this.setState({show: true, info:e.target.outerText})
    }

    hideModal(){
        this.setState({show: false})
        console.log(this.state.show);
    }

    renderLoading () {
        return <div>Loading...</div>
    }
    handleChange(e){

        this.setState({filters:e.target.value});
        /*this.parseData(this.state.data)
        console.log(this.state.data)
        console.log(e.target.value);*/
    }
    handleClick(e) {

        const { sort } = this.state;
        let nextSort;
        nextSort = e.target.value;
        if(sort === '^') nextSort = 'v';
        else if (sort === 'v') nextSort = '^';
        this.setState({sort: nextSort});

    }
    renderData(data){



        if (data && data.length>0){
            const { filters } = this.state;
            const {sort} = this.state;

            if (filters.length) {
                data = data.filter(item => item.title.toLowerCase().includes(filters.toLowerCase()))
            }

            if (sort.length) {
                /*data = [...data].sort((a,b) => a.mal_id - b.mal_id)*/
                if(sort === '^')
                {
                   data = [...data].sort((a,b) =>(

                            a.mal_id - b.mal_id
                        )
                    )
                } else if (sort === 'v') {

                    data = [...data].sort((a,b) =>
                        (

                            b.mal_id - a.mal_id
                        )
                    )

                }
            }
        }

        let contents = [];
        let totalRecords = data.length;
        console.log('line 179: ' + typeof(totalRecords));
            data.map((item, index) => {
                contents.push(

                        <div className="col-md py-3" key={index}>
                        <div className="card" >
                            <img className="card-img-top" src={item.image_url} alt="Card image cap" />
                            <div className="card-body">
                              <a href="#" onClick={(e) => this.showModal(e)} ><h5 className="card-title">{item.title}</h5></a>
                              <p className="card-text">{item.synopsis}</p>
                              <p className="card-text"><small className="text-muted">Type: {item.type}</small></p>
                            </div>
                            <Modal handleClose={this.hideModal} show={this.state.show} >
                              <h1>Title: {this.state.info}</h1>
                            </Modal>
                        </div>
                        </div>
                    )

                if((index+1)%4 === 0) {
                    contents.push(
                        <div className="w-100" ></div>
                    )
                }
            })

                /*<div><NewComponent totalRecords={90} pageLimit={9} pageNeighbours = {1}/></div>*/
            return(
            <div className="container-fluid">
                <div><Pagination totalRecords={90} pageLimit={9} pageNeighbours = {1}/></div>
                <div>
                    <h1>The Component has Mounted,
                    Check the browser 'console'</h1>
                    <input type='text' onChange={this.handleChange} placeholder="Search by title ..." />
                    <input type='button' value={this.state.sort} onClick={this.handleClick} />
                </div>

                <div><div className="row">{contents} </div></div>
            </div>
            )
    }


    render(){

        const {data} = this.state;

        return data ?
        this.renderData(data)
        : this.renderLoading()
    }


}

const toLeft='left';
const toRight='right';

const range = (from, to , step = 1 ) => {

    let i = from;
    const range = [];

    while (i<=to){
        range.push(i);
        i = i + step;
    }

    return range;
}

class Pagination extends React.Component {

    constructor(props) {

        super(props);
        const {totalRecords = 0, pageLimit = 0, pageNeighbours = 0} = props;

        this.state = {currentPage:9};

        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 0
        this.pageNeighbours = typeof pageNeighbours === 'number' ? pageNeighbours : 0
        this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0


    }

    fetchNumbers = () => {

        const totalPages = Math.ceil(this.totalRecords / this.pageLimit);//90/10, 9 con so dua len pagination
        const currentPage = this.state.currentPage;
        const totalNumbers = (this.pageNeighbours*2)+3;
        const totalBlocks = totalNumbers + 2;

        if(totalPages>totalBlocks){
            const first = Math.max(2, currentPage - this.pageNeighbours);
            const last = Math.min(totalPages - 1, currentPage + this.pageNeighbours);
            let displayPageNumbers = range(first, last);


            const hasLeftSpill = first > 2;
            const hasRightSpill = (totalPages - last) > 1;
            const spillOffset = totalNumbers - (displayPageNumbers.length + 1);//so number still hiding


            switch(true) {

                //(1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {

                    const page2 = range(first - spillOffset, first - 1);
                    displayPageNumbers = [toLeft,...page2, ...displayPageNumbers];
                    break;
                }
                //(1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {

                    const page2 = range(last + 1, last + spillOffset);
                    displayPageNumbers = [...displayPageNumbers, ...page2, toRight];
                    break;
                }

                //(1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    displayPageNumbers = [toLeft, ...displayPageNumbers, toRight];
                    break;
                }
            }

            return [1, ...displayPageNumbers, totalPages];
        }

        return range(1, totalPages);
    }

    render(){
        const pages = this.fetchNumbers();
        console.log('line 230: ' + pages);

        return (
            <div>
            <ul className="pagination">
                { pages.map((page, i) => {

                        if(page === toRight) return(

                          <li key={i} className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                              </a>
                          </li>
                        );
                         if(page === toLeft) return(

                            <li key={i} className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" >
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                        );
                        return(

                            <li key={i} className="page-item">
                              <a className="page-link" href="#">{ page }</a>
                            </li>
                        );




                    })}

            </ul>
                <h1>Pagination: {this.totalRecords}, {this.pageLimit}, {this.pageNeighbours}

                </h1>
            </div>
        );
    }
}



/*--------------------------------------------------------------*/
/* Main Component App */
class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        descendant: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    console.log('Clicked: ' + e.target.target);
  }

  render() {
      return(
            <div>

                <Display />

            </div>

        );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));