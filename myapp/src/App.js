
import './App.css';
import axios from 'axios'
import React,{ useState } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: ' Chart',
    },
  },
};



class App extends React.Component {
  state={
    details : [],
    chart_labels:[],
    chart: {
      labels: [],
      datasets: [],
    },
    count: {
      labels: [],
      datasets: [],
    },
    search:'',
    category:'',
    sold:false,
    minprice:0,
    maxprice:5000,

  }
  componentDidMount(){
    let data;
    axios.get('https://xyzafreen.pythonanywhere.com/app/sales/')
    .then(res =>{
      data=res.data;
      this.setState({
        details: data
      });
    })
    .catch(err=>{console.error(err)});

    
    axios.get('https://xyzafreen.pythonanywhere.com/app/data/')
    .then(res =>{
        let labels = res.data.labels;
        let values = res.data.data;
        
        let dataa = {
        labels,
        datasets: [
          {
            label: 'total sales amount of each category,',
            data: values,
            backgroundColor: 'rgba(0, 84, 140, 0.98)',
          },
          
        ],
      }; 
      this.setState({
        chart: dataa
    });
    this.setState({
      chart_labels: labels
  });
  })
  .catch(err=>{console.error(err)});

  axios.get('https://xyzafreen.pythonanywhere.com/app/count/')
  .then(res =>{
      let labels = res.data.labels;
      let values = res.data.data;
      
      let dataa = {
      labels,
      datasets: [
        {
          label: 'total number of items in each category',
          data: values,
          backgroundColor: 'rgba(140, 0, 84, 0.98)',
        },
        
      ],
    }; 
    this.setState({
      count: dataa
  });
})
.catch(err=>{console.error(err)});
  
  }
  
  
  
  render(){return (
    <div className="App">
      <Container>
      <Form>
        <Form.Control 
        onChange={(e) => this.setState({ search: e.target.value })}
        placeholder="search"/>
      </Form>
      <Form.Group>
        <Form.Control as="select" value={this.state.category}
        onChange={(e) => this.setState({ category: e.target.value })}>
        <option value=''>All Categories</option>
        {this.state.chart_labels.map((label)=>(
          <option key={label} value={label}>{label}</option>
        ))} 
         
        </Form.Control>
      </Form.Group>
      <Form.Group >
        <Form.Check
          type="checkbox"
          label="Sold"
          checked={this.state.sold}
          onChange={(e) => this.setState({sold:!this.state.sold})}
        />
      </Form.Group>
      <Form.Group >
        <Form.Label>Price Range</Form.Label>
        <div>
          <input
            type="number"
            value={this.state.minprice}
            onChange={(e) => this.setState({minprice: e.target.value})}
            placeholder="Min Price"
            style={{ width: '100px', marginRight: '10px' }}
          />
          to
          <input
            type="number"
            value={this.state.maxprice}
            onChange={(e) => this.setState({maxprice: e.target.value})}
            placeholder="Max Price"
            style={{ width: '100px', marginLeft: '10px' }}
          />
        </div>
      </Form.Group>

      <Table striped bordered hover>
        <thead>
        <tr>
        <th>Product Title</th>
        <th>Price</th>
        <th>Description</th>
        <th>Category</th>
        <th>Image</th>
        <th>Sold</th>
        <th>Is Sale</th>
        </tr>
        </thead>
        <tbody>
        {this.state.details
              .filter((product) => {
                  const matchesSearch = product.Title.toLowerCase().includes(this.state.search.toLowerCase());
                  const matchesCategory = this.state.category ? product.Category === this.state.category : true;
                  const matchesSold = this.state.sold ? product.Sold === true : true;
                  const matchesPrice = product.Price >= this.state.minprice && product.Price <= this.state.maxprice;
              
                  return matchesSearch && matchesCategory && matchesSold && matchesPrice;
                })
            .map((product)=>(
          <tr key={product.id}>
                <td>{product.Title}</td>
                <td>{product.Price}</td>
                <td>{product.Description}</td>
                <td>{product.Category}</td>
                <td><img src={product.Image} style={{ width: '50px', height: '50px' }}/></td>
                <td>{product.Sold ? 'Yes' : 'No'}</td>
                <td style={{display:'inline-block',marginTop: '20px',height: '20px',width: '20px',backgroundColor: product.IsSale ? 'Green' : 'Red',borderRadius: '50%'}}> 
              </td>

          </tr>
        ))}
        </tbody>
      </Table>
      <Bar options={options} data={this.state.chart} />
      <Bar options={options} data={this.state.count} />
      </Container>
      
    </div>
  );
}
}

export default App;
