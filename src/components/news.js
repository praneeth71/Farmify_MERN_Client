import React from 'react';
import axios from 'axios';
import '../css/news.css';


class News extends React.Component {
    state = {
        query : 'indian agriculture',
        apikey:'cd9774bdb78d482f8161739f5166e804',
        articles:Array.from([]),
        response:false,
        content:false,
        date:'',
        url:'',
        count : 0
    }

    getArticles = (url,q)=>{
        axios.get(url).then(res => {
            this.setState(prevState=>({
                ...prevState,
                articles:res.data.articles,
                response:true,
                content:true,
                query:q,
                count : res.data.articles.length,
            }));
        }).catch(err=>{
            this.setState(prevState=>({
                ...prevState,
                articles:[],
                response:true,
                content:false,
                query:q,
                count:0,
            }));
        });
    }
    
    componentDidMount(){
        // retrive latest news on indian agriculture 
        var url = 'https://newsapi.org/v2/everything?q='+this.state.query+'&lang=english&sortBy=publishedAt&apiKey='+this.state.apikey;
        this.getArticles(url,this.state.query);
    }

    handleSearch = (e)=>{
        e.preventDefault();
        let q = e.target.parentNode.firstChild.value;
        if(q!==''){
            var url = 'https://newsapi.org/v2/everything?q='+q+'&lang=english&sortBy=publishedAt&apiKey='+this.state.apikey;
           this.getArticles(url,q);
        }

    }

    render(){
        console.log(this.state.articles);
         var news = this.state.response===true ? (
             this.state.content===true ? (
                 this.state.articles.map((article,ind)=>(
                    <div className="article d-flex m-2 border border-dark bold" key={ind}>
                        <ul className="list-group m-1">
                            <li className="list-group-item active"><b>Title :</b> {article.title} <br></br> <b>Author :</b> {article.author}</li>
                            <li className="list-group-item"><b>Published on : </b>{article.publishedAt}</li>
                            <li className="list-group-item"><b>Description :</b> {article.description}</li>
                            <li className="list-group-item"><b>Content : </b>{article.content} <a role='button' className="btn btn-primary" href={article.url}>Read More</a></li>
                            
                        </ul>
                        <div className="m-1">
                            <img src={article.urlToImage} style={{width: '100%',height:'100%'}} alt='Pic Not Found'/>
                        </div>
                    </div>
                 ))
             ):(<div>Failed</div>)
         ):(<div className="">Loading...</div>);
        
        return(
            <div className='news'>
                <div className='list-group-item active m-2 rounded d-flex justify-content-between'>
                    <div className='q h5 align-middle'>
                    {this.state.count} Results For {this.state.query.toUpperCase()} . . . . . . . . . .
                    </div>
                    <form className='d-flex justify-content-around'>
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" required={true}/>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn btn-info" onClick={this.handleSearch} type='submit'>Search</button>
                    </form>
                </div>
                <div className="articles m-4">
                    {news}
                </div>
            </div>
        );
    }
}

export default News;