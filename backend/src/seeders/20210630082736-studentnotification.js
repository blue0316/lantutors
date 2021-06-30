'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'StudentNotifications',
      [
        {
          student: 'elias@elias.com',
          tutor: 'john@john.com',
          title: `[Tutor ${
            `john@john.com`.split('@')[0]
          }]: ${new Date()}`,
          message:
            'Great to meet everyone and see you all on our site visit next Friday. \
             Reminding @noah@noah.com @kate@kate.com and @elias@elias.com to bring their registration forms.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'noah@noah.com',
          tutor: 'john@john.com',
          title: `[Tutor ${
            `john@john.com`.split('@')[0]
          }]: ${new Date()}`,
          message:
            'Great to meet everyone and see you all on our site visit next Friday. \
             Reminding @noah@noah.com @kate@kate.com and @elias@elias.com to bring their registration forms.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'kate@kate.com',
          tutor: 'john@john.com',
          title: `[Tutor ${
            `john@john.com`.split('@')[0]
          }]: ${new Date()}`,
          message:
            'Great to meet everyone and see you all on our site visit next Friday. \
             Reminding @noah@noah.com @kate@kate.com and @elias@elias.com to bring their registration forms.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'chris@chris.com',
          tutor: 'john@john.com',
          title: `[Tutor ${
            `john@john.com`.split('@')[0]
          }]: ${new Date()}`,
          message:
            'Great to meet everyone and see you all on our site visit next Friday. \
             Reminding @noah@noah.com @kate@kate.com and @elias@elias.com to bring their registration forms.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'chris@chris.com',
          tutor: 'henry@henry.com',
          title: `[Tutor ${
            `henry@henry.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Hello all!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'noah@noah.com',
          tutor: 'henry@henry.com',
          title: `[Tutor ${
            `henry@henry.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Hello all!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'kate@kate.com',
          tutor: 'henry@henry.com',
          title: `[Tutor ${
            `henry@henry.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Hello all!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'elias@elias.com',
          tutor: 'henry@henry.com',
          title: `[Tutor ${
            `henry@henry.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Hello all!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'noah@noah.com',
          tutor: 'isabel@isabel.com',
          title: `[Tutor ${
            `isabel@isabel.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Can anyone help me register @elias@elias.com?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'kate@kate.com',
          tutor: 'isabel@isabel.com',
          title: `[Tutor ${
            `isabel@isabel.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Can anyone help me register @elias@elias.com?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'chris@chris.com',
          tutor: 'isabel@isabel.com',
          title: `[Tutor ${
            `isabel@isabel.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Can anyone help me register @elias@elias.com?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'elias@elias.com',
          tutor: 'isabel@isabel.com',
          title: `[Tutor ${
            `isabel@isabel.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Can anyone help me register @elias@elias.com?',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'noah@noah.com',
          tutor: 'mary@mary.com',
          title: `[Tutor ${
            `mary@mary.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Please send in your proposal @chris@chris.com.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'chris@chris.com',
          tutor: 'mary@mary.com',
          title: `[Tutor ${
            `mary@mary.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Please send in your proposal @chris@chris.com.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'chris@chris.com',
          tutor: 'alfred@alfred.com',
          title: `[Tutor ${
            `alfred@alfred.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Welcome new students!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student: 'kate@kate.com',
          tutor: 'alfred@alfred.com',
          title: `[Tutor ${
            `alfred@alfred.com`.split('@')[0]
          }]: ${new Date()}`,
          message: 'Welcome new students!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'StudentNotifications',
      null,
      {}
    );
  },
};
