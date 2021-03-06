import {mount, withOptions} from 'react-mounter';
import App from '../../imports/ui/App.jsx';
import QuestionList from "../../imports/ui/questions/QuestionList"
import Add from "../../imports/ui/Add.jsx"
import Question from "../../imports/ui/Question.jsx"

const mount2 = withOptions({
	rootId: 'renderPage-target',
}, mount);

FlowRouter.route("/",{
	action: function(params, queryParams) {
		mount(App)
	}
})

FlowRouter.route("/add",{
	action: function(params, queryParams) {
		mount(Add)
	}
})

FlowRouter.route("/questions", {
	action: function(params, queryParams) {
		mount(QuestionList, {query:queryParams.query})
	}
});
FlowRouter.route("/question/:id", {
	action: function(params, queryParams) {
		console.log(params.id)
		mount(Question, {id:params.id})
	}
});