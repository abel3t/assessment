export enum LifeType {
  Worship = 'Worship',
  MakeDisciples = 'MakeDisciples',
  Fellowship = 'Fellowship',
  Serve = 'Serve',
  Missionary = 'Missionary'
}

export const LifeTitle = {
  [LifeType.Worship]: 'Đời sống thờ phượng',
  [LifeType.MakeDisciples]: 'Đời sống môn đồ hoá',
  [LifeType.Fellowship]: 'Đời sống thông công',
  [LifeType.Serve]: 'Đời sống phục vụ',
  [LifeType.Missionary]: 'Đời sống truyền giáo'
};

export const questions = [
  {
    id: 1,
    title: 'Tôi rất thích thì giờ nhóm lại thờ phượng chung với Hội Thánh',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 2,
    title: 'Đời sống tôi bày tỏ rằng Đức Chúa Trời là trung tâm và ưu tiên của tôi',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 3,
    title: 'Tôi luôn phụ thuộc vào Chúa trong mỗi lĩnh vực của đời sống tôi',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 4,
    title: 'Tôi ao ước được ở trong sự hiện diện của Chúa',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 5,
    title: 'Tôi thường xuyên đọc Kinh Thánh, tĩnh nguyện và mời Chúa cùng đi với tôi mỗi ngày ',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 6,
    title: 'Tôi là một người như nhau khi ở với mọi người và khi ở một mình',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 7,
    title: 'Dù khi không cảm nhận được Chúa hiện diện, tôi vẫn tin chắc chắn rằng Ngài đang hiện diện',
    type: LifeType.Worship,
    isRequired: true
  },
  {
    id: 8,
    title: 'Tôi dễ dàng nhận ra và xưng nhận bất cứ điều gì trong suy nghĩ, hành vi, tâm tánh của tôi mà không giống với Chúa Jêsus',
    type: LifeType.MakeDisciples,
    isRequired: true
  },
  {
    id: 9,
    title: 'Cách tôi sử dụng tài chính, tiền bạc thể hiện rằng tôi nghĩ về Chúa và về người khác nhiều hơn chính mình',
    type: LifeType.MakeDisciples,
    isRequired: true
  },
  {
    id: 10,
    title: 'Tôi để cho Lời Chúa (Kinh Thánh) hướng dẫn suy nghĩ và thay đổi hành động của mình',
    type: LifeType.MakeDisciples,
    isRequired: true
  },
  {
    id: 11,
    title: 'Tôi có thể ca ngợi Chúa trong những khó khăn, nghịch cảnh, thất bại và xem đó là cơ hội để trưởng thành thay vì phàn nàn',
    type: LifeType.MakeDisciples,
    isRequired: true
  }, {
    id: 12,
    title: 'Khi bị cám dỗ để hành động theo bản năng của mình, tôi có thể đăng ra quyết định làm theo điều mình biết Chúa đẹp lòng',
    type: LifeType.MakeDisciples,
    isRequired: true
  }, {
    id: 13,
    title: 'Tôi kinh nghiệm rằng lời cầu nguyện đã thay đổi cách nhìn và cách sống của tôi',
    type: LifeType.MakeDisciples,
    isRequired: true
  },
  {
    id: 14,
    title: 'Tôi đang xây dựng và duy trì những thói quen giúp tôi phát triển đời sống tin kính giống Chúa Jêsus',
    type: LifeType.MakeDisciples,
    isRequired: true
  },
  {
    id: 15,
    title: 'Tôi cởi mở và chân thành về tính cách, suy nghĩ, điểm mạnh và điểm yếu của mình với anh chị em trong Chúa',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 16,
    title: 'Tôi biết nhu cầu, tình trạng của anh chị em mình và thường xuyên dành thời gian, cơ hội, điều mình có thể để quan tâm, đáp ứng, khích lệ',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 17,
    title: 'Tôi có những mối quan hệ chất lượng trong nhóm nhỏ hoặc trong Hội Thánh để chia sẻ',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 18,
    title: 'Tôi dễ dàng lắng nghe lời khuyên, lời động viên và đôi khi là lời góp ý từ anh chị em',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 19,
    title: 'Tôi rất thường xuyên tham gia nhóm lại với Hội Thánh và nhóm nhỏ',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 20,
    title: 'Hiện tại tôi không có vấn đề liên quan đến mối quan hệ mà chưa giải quyết được',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 21,
    title: 'Tôi luôn cử xử và nói về anh chị em của mình theo cùng một cách dù người đó có mặt hay không có mặt',
    type: LifeType.Fellowship,
    isRequired: true
  },
  {
    id: 22,
    title: 'Tôi thường xuyên và sẵn sàng dành thời gian để phục vụ Chúa, anh chị em, nhóm nhỏ, Hội Thánh',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 23,
    title: 'Tôi đang có vai trò, đang phục vụ Chúa đúng với những ấn tứ, sự thôi thúc Chúa ban cho tôi\n',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 24,
    title: 'Tôi luôn quan tâm rằng đời sống của mình đang mang lại ích lợi thế nào cho Vương Quốc của Chúa (Hội Thánh)',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 25,
    title: 'Tôi luôn suy nghĩ, tìm cách để phục vụ hiệu quả hơn với những khả năng, ân tứ, kỹ năng Chúa ban cho mình',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 26,
    title: 'Tôi thích việc phục vụ người khác (đáp ứng nhu cầu của người khác) mà không đòi hỏi nhận lại điều gì',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 27,
    title: 'Những anh em biết tôi sẽ đồng ý rằng đời sống của tôi là đời sống ban cho nhiều hơn nhận lãnh',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 28,
    title: 'Tôi thấy những gì mình có, kể cả những kinh nghiệm, những thất bại, lời chứng, nỗi đau,... đều là cơ hội để tôi giúp đỡ người khác',
    type: LifeType.Serve,
    isRequired: true
  },
  {
    id: 29,
    title: 'Theo tôi việc chia sẻ về niềm tin nơi Chúa Jêsus là trách nhiệm cá nhân của mỗi người',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 30,
    title: 'Tôi luôn tìm cách xây dựng mối quan hệ với những người chưa biết về Chúa Jêsus',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 31,
    title: 'Tôi thường xuyên nhớ những cái tên của người chưa tin Chúa và cầu nguyện cho họ',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 32,
    title: 'Tôi tự tin về khả năng chia sẻ niềm tin của mình',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 33,
    title: 'Tấm lòng tôi tràn đầy nhiệt huyết chia sẻ về Chúa cho những người chưa biết về Chúa',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 34,
    title: 'Khi nói chuyện với người chưa tin Chúa thì tôi thường nhắc tới Chúa hoặc nhắc tới đời sống đức tin của mình như Hội Thánh, nhóm nhỏ',
    type: LifeType.Missionary,
    isRequired: true
  },
  {
    id: 35,
    title: 'Tôi sẵn sàng để đi đến bất kỳ nơi nào Chúa gọi tôi, và dùng tôi để chia sẻ về đức tin nơi Ngài',
    type: LifeType.Missionary,
    isRequired: true
  }
];
