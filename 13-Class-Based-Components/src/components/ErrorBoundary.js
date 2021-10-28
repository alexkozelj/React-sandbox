import { Component } from 'react';

class ErrorBoundary extends Component {
   constructor() {
      super()
      this.state = { hasError: false}
   }
   
   componentDidCatch(error) {
      
      this.setState({ hasError: true })
   }

   render() {
      console.log("🚀 ~ file: ErrorBoundary.js ~ line 16 ~ ErrorBoundary ~ render ~ this.hasError", this.hasError)
      if (this.state.hasError) {

         return <h1>Something went wrong</h1>
      } 
         return this.props.children
      
   }
}

export default ErrorBoundary;