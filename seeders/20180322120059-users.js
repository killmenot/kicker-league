'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Иван',
        last_name: 'Жуков',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        first_name: 'Алексей',
        last_name: 'Резников',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        first_name: 'Александр',
        last_name: 'Аксенов',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        first_name: 'Денис',
        last_name: 'Золотарев',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        first_name: 'Егор',
        last_name: 'Навизнев',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        first_name: 'Кристина',
        last_name: 'Гущина',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        first_name: 'Михаил',
        last_name: 'Крикун',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        first_name: 'Ярослав',
        last_name: 'Грабовецкий',
        team_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        first_name: 'Дмитрий',
        last_name: 'Петровец',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        first_name: 'Алексей',
        last_name: 'Кучеренко',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        first_name: 'Геннадий',
        last_name: 'Чигишев',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        first_name: 'Владислав',
        last_name: 'Кучеренко',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 13,
        first_name: 'Александр',
        last_name: 'Денисов',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 14,
        first_name: 'Николай',
        last_name: 'Сохряков',
        team_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 15,
        first_name: 'Кирилл',
        last_name: 'Смирнов',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 16,
        first_name: 'Глеб',
        last_name: 'Болтаев',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 17,
        first_name: 'Анастасия',
        last_name: 'Шибаева',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 18,
        first_name: 'Владислав',
        last_name: 'Коновалов',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 19,
        first_name: 'Сергей',
        last_name: 'Наливайка',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 20,
        first_name: 'Александр',
        last_name: 'Лашуков',
        team_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

