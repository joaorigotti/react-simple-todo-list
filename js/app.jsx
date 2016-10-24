'use strict';

const STORAGE_ID = '__todolist__';

const TodoList = React.createClass({
  
  getInitialState() {
    return {
      newItemDescription: '',
      listItens: JSON.parse(localStorage.getItem(STORAGE_ID)) || []
    };
  },
  
  newItemDescriptionChange(e) {
    this.setState({ newItemDescription: e.target.value });
  },
  
  addItem(e) {
    e.preventDefault();
    
    let itens = this.state.listItens.slice();
    
    itens.push({
      name: this.state.newItemDescription,
      done: false
    });
    
    localStorage.setItem(STORAGE_ID, JSON.stringify(itens));
    
    this.setState({ listItens: itens });
    this.state.newItemDescription = '';
  },
  
  getClassNames(index) {
    let classesFor = {
          li: ['list-group-item'],
          button: ['btn', 'btn-primary', 'btn-xs', 'pull-right']
        },
        
        successClasses = {
          li: 'list-group-item-success',
          button: 'btn-success'
        };
    
    if (this.state.listItens[index].done) {
      classesFor.li.push(successClasses.li);
      classesFor.button.push(successClasses.button);
    }
    
    function forLi() {
      return classesFor.li.join(' ');
    }
    
    function forButton() {
      return classesFor.button.join(' ');
    }
    
    return {
      forLi: forLi,
      forButton: forButton
    };
    
  },
  
  getItens() {
    let itens = [];
    
    this.state.listItens.forEach(function(item, index) {
      itens.push(
        
        <li className={this.getClassNames(index).forLi()}>
          {item.name}
          
          <button 
            className={this.getClassNames(index).forButton()}
            disabled={item.done}
            type="button" 
            id={index} 
            onClick={this.done}>
            
            Done!
          </button>
        </li>
      
      );
    }.bind(this));
    
    return this.defaultItem(itens);
  },
  
  defaultItem(itens) {
    if (itens.length <= 0) {
      itens.push(<li className="list-group-item list-group-item-info"><em>Nothing to do...</em></li>);
    }
    
    return itens;
  },
  
  done(e) {
    let itens = { listItens: [] },
        index = e.target.id;
    
    itens.listItens = this.state.listItens.slice();
    itens.listItens[index].done = true;
    
    this.setState(itens);
    localStorage.setItem(STORAGE_ID, JSON.stringify(itens.listItens));
  },
  
  clearAll() {
    this.setState({ listItens: [] });
    localStorage.setItem(STORAGE_ID, null);
  },
  
  render() {
    return (
      
      <div className="panel panel-default">
        <div className="panel-heading"><h2 className="reset-margin">To do list</h2></div>
        
        <div className="panel-body">
          <ul className="list-group reset-margin">
            {this.getItens()}
          </ul>
        </div>
        
        <div className="panel-footer clearfix">
          <form onSubmit={this.addItem}>
            <div className="input-group col-xs-8 pull-left">
              <input 
                type="text" 
                className="form-control input-xxlarge" 
                aria-label="My task" 
                placeholder="my task..." 
                value={this.state.newItemDescription} 
                onChange={this.newItemDescriptionChange} />

              <div className="input-group-btn">
                <button 
                  className="btn btn-primary" 
                  type="submit"
                  disabled={ this.state.newItemDescription.length === 0 }>
                  
                  Add
                </button>
              </div>
            </div>
          </form>
          <button 
            className="btn btn-default pull-right" 
            type="button" 
            disabled={this.state.listItens.length < 1} 
            onClick={this.clearAll}>
            
            Clear list
          </button>
        </div>
      </div>
      
    );
  }
  
});

ReactDOM.render(<TodoList />, document.querySelector('#todo-app'));
