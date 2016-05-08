"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer, Boolean, Float, String
from xblock.fragment import Fragment
from django.template import Context, Template

class MemoryGameXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0,
        scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    display_name = String(
        display_name="Display Name",
        default="Memory Game",
        scope=Scope.settings,
        help="This name appears in the horizontal navigation at the top of the page."
    )

    attempts = Integer(
        default=0,
        scope=Scope.user_state,
        help="Counter for the user attempts, if a max is setted, not could be greather than this value"
    )

    max_attempts = Integer(
        default=0,
        scope=Scope.user_state,
        help="Limit the maximum of attempts for the user, take care that not set it too low"
    )

    users_win_count = Integer(
        default=0,
        scope=Scope.user_state_summary,
        help="A counter for how many users have won this game in the course"
    )

    has_won = Boolean(
        default=0,
        scope=Scope.user_state,
        help="Has this student already won the game?"
    )

    weight = Float(
        display_name="Weight",
        help="The maximum score the learner can receive for the problem",
        scope=Scope.settings,
        default=1,
    )

    # XBlock settings
    block_settings_key = 'memory-game'
    has_score = True

    '''
    Util functions
    '''
    def load_resource(self, resource_path):
        """
        Gets the content of a resource
        """
        resource_content = pkg_resources.resource_string(__name__, resource_path)
        return resource_content.decode("utf8")

    def render_template(self, template_path, context={}):
        """
        Evaluate a template by resource path, applying the provided context
        """
        template_str = self.load_resource(template_path)
        return Template(template_str).render(Context(context))

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the MemoryGameXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/memory_game.html")
        frag = Fragment(html.format(self=self))

        frag.add_css_url(
            self.runtime.local_resource_url(
                self, "public/css/main.css"))
        #
        frag.add_javascript_url(
            self.runtime.local_resource_url(
                self, "public/js/lib/require.js"))
        frag.add_javascript_url(
            self.runtime.local_resource_url(
                self, "public/js/main-built.js"))

        frag.add_css(self.resource_string("static/css/memory_game.css"))
        frag.add_javascript(self.resource_string("static/js/src/memory_game.js"))
        frag.initialize_js('MemoryGameXBlock')
        return frag

    def studio_view(self, context):
        """
        Editing view in Studio
        """

        help_texts = {
            field_name: field.help
            for field_name, field in self.fields.viewitems() if hasattr(field, "help")
        }
        context = {
            'help_texts': help_texts,
            'self': self,
        }

        html = self.render_template('static/html/memory_game_edit.html', context)

        frag = Fragment(html)

        frag.add_javascript(self.load_resource("static/js/src/memory_game_edit.js"))
        frag.initialize_js('MemoryGameEditXBlock')
        return frag

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        self.display_name = data['display_name']
        self.weight = data['weight']

        return {
            'result': 'success',
        }

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    @XBlock.json_handler
    def increment_attempts(self, data, suffix=''):
        """
        After fip two cart with no match, the attempts counter is incremented
        by this handler.
        """

        if data['increment_attms'] == '1':
            self.attempts += 1
        return {"attempts": self.attempts}

    @XBlock.json_handler
    def user_wins(self, data, suffix=''):
        """
        When the backbone app detect that all card where matched send a true
        to this handler to check that the user has won.
        """
        self.users_win_count += 1


        if not self.has_won:
            self.runtime.publish(
                self, "grade", {
                    value: 1.0, max_value: 1.0
                }
            )
            self.has_won = True

        return {"win_status_msg": "YOU WIN!!!"}


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("MemoryGameXBlock",
             """<memory_game/>
             """),
            ("Multiple MemoryGameXBlock",
             """<vertical_demo>
                <memory_game/>
                <memory_game/>
                <memory_game/>
                </vertical_demo>
             """),
        ]
