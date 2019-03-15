const surveyQuestionsData = [
    { 
        id: 0,
        group: 0,
        name: "Đạo đức nhà giáo",
        pass: "Thực hiện nghiêm túc các quy định về đạo đức nhà giáo",
        good: "Có tinh thần tự học, tự rèn luyện và phấn đấu nâng cao phẩm chất đạo đức nhà giáo",
        veryGood: "Là tấm gương mẫu mực về đạo đức nhà giáo; chia sẻ kinh nghiệm, hỗ trợ đồng nghiệp trong rèn luyện đạo đức nhà giáo"
    },
    { 
        id: 1,
        group: 0,
        name: "Phong cách nhà giáo",
        pass: "Có tác phong và cách thức làm việc phù hợp với công việc của giáo viên cơ sở giáo dục phổ thông",
        good: "Có ý thức tự rèn luyện tạo phong cách nhà giáo mẫu mực; ảnh hưởng tốt đến học sinh",
        veryGood: "Là tấm gương mẫu mực về phong cách nhà giáo; ảnh hưởng tốt và hỗ trợ đồng nghiệp hình thành phong cách nhà giáo"
    },
    { 
        id: 2,
        group: 1,
        name: "Phát triển chuyên môn bản thân",
        pass: "Đạt chuẩn trình độ đào tạo và hoàn thành đầy đủ các khóa đào tạo, bồi dưỡng kiến thức chuyên môn theo quy định; có kế hoạch thường xuyên học tập, bồi dưỡng phát triển chuyên môn bản thân",
        good: "Chủ động nghiên cứu, cập nhật kịp thời yêu cầu đổi mới về kiến thức chuyên môn; vận dụng sáng tạo, phù hợp các hình thức, phương pháp và lựa chọn nội dung học tập, bồi dưỡng, nâng cao năng lực chuyên môn của bản thân",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp và chia sẻ kinh nghiệm về phát triển chuyên môn của bản thân nhằm đáp ứng yêu cầu đổi mới giáo dục"
    },
    { 
        id: 3,
        group: 1,
        name: "Xây dựng kế hoạch dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh",
        pass: "Xây dựng được kế hoạch dạy học và giáo dục",
        good: "Chủ động điều chỉnh kế hoạch dạy học và giáo dục phù hợp với điều kiện thực tế của nhà trường và địa phương",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp trong việc xây dựng kế hoạch dạy học và giáo dục"
    },
    { 
        id: 4,
        group: 1,
        name: "Sử dụng phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh",
        pass: "Áp dụng được các phương pháp dạy học và giáo dục phát triển phẩm chất, năng lực cho học sinh",
        good: "Chủ động cập nhật, vận dụng linh hoạt và hiệu quả các phương pháp dạy học và giáo dục đáp ứng yêu cầu đổi mới, phù hợp với điều kiện thực tế",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp về kiến thức, kĩ năng và kinh nghiệm vận dụng những phương pháp dạy học và giáo dục theo hướng phát triển phẩm chất, năng lực học sinh"
    },
    { 
        id: 5,
        group: 1,
        name: "Kiểm tra, đánh giá theo hướng phát triển phẩm chất, năng lực học sinh",
        pass: "Sử dụng các phương pháp kiểm tra đánh giá kết quả học tập và sự tiến bộ của học sinh",
        good: "Chủ động cập nhật, vận dụng sáng tạo các hình thức, phương pháp, công cụ kiểm tra đánh giá theo hướng phát triển phẩm chất, năng lực học sinh",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp kinh nghiệm triển khai hiệu quả việc kiểm tra đánh giá kết quả học tập và sự tiến bộ của học sinh"
    },
    { 
        id: 6,
        group: 1,
        name: "Tư vấn và hỗ trợ học sinh",
        pass: "Hiểu các đối tượng học sinh và nắm vững quy định về công tác tư vấn và hỗ trợ học sinh; thực hiện lồng ghép hoạt động tư vấn, hỗ trợ học sinh trong hoạt động dạy học và giáo dục",
        good: "Thực hiện hiệu quả các biện pháp tư vấn và hỗ trợ phù hợp với từng đối tượng học sinh trong hoạt động dạy học và giáo dục",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp kinh nghiệm triển khai hiệu quả hoạt động tư vấn và hỗ trợ học sinh trong hoạt động dạy học và giáo dục"
    },
    { 
        id: 7,
        group: 2,
        name: "Xây dựng văn hóa nhà trường",
        pass: "Thực hiện đầy đủ nội quy, quy tắc văn hóa ứng xử của nhà trường theo quy định",
        good: "Đề xuất biện pháp thực hiện hiệu quả nội quy, quy tắc văn hóa ứng xử của nhà trường theo quy định; có giải pháp xử lý kịp thời, hiệu quả các vi phạm nội quy, quy tắc văn hóa ứng xử trong lớp học và nhà trường trong phạm vi phụ trách (nếu có)",
        veryGood: "Là tấm gương mẫu mực, chia sẻ kinh nghiệm trong việc xây dựng môi trường văn hóa lành mạnh trong nhà trường"
    },
    { 
        id: 8,
        group: 2,
        name: "Thực hiện quyền dân chủ trong nhà trường",
        pass: "Thực hiện đầy đủ các quy định về quyền dân chủ trong nhà trường, tổ chức học sinh thực hiện quyền dân chủ trong nhà trường",
        good: "Đề xuất biện pháp phát huy quyền dân chủ của học sinh, của bản thân, cha mẹ học sinh hoặc người giám hộ và đồng nghiệp trong nhà trường; phát hiện, phản ánh, ngăn chặn, xử lý kịp thời các trường hợp vi phạm quy chế dân chủ của học sinh (nếu có)",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp trong việc thực hiện và phát huy quyền dân chủ của học sinh, của bản thân, cha mẹ học sinh hoặc người giám hộ và đồng nghiệp"
    },
    { 
        id: 9,
        group: 2,
        name: "Thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường",
        pass: "Thực hiện đầy đủ các quy định của nhà trường về trường học an toàn, phòng chống bạo lực học đường",
        good: "Đề xuất biện pháp xây dựng trường học an toàn, phòng chống bạo lực học đường; phát hiện, phản ánh, ngăn chặn, xử lí kịp thời các trường hợp vi phạm quy định về trường học an toàn, phòng chống bạo lực học đường (nếu có)",
        veryGood: "Là điển hình tiên tiến về thực hiện và xây dựng trường học an toàn, phòng chống bạo lực học đường; chia sẻ kinh nghiệm xây dựng và thực hiện trường học an toàn, phòng chống bạo lực học đường"
    },
    { 
        id: 10,
        group: 3,
        name: "Tạo dựng mối quan hệ hợp tác với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan",
        pass: "Thực hiện đầy đủ các quy định hiện hành đối với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan",
        good: "Tạo dựng mối quan hệ lành mạnh, tin tưởng với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan",
        veryGood: "Đề xuất với nhà trường các biện pháp tăng cường sự phối hợp chặt chẽ với cha mẹ hoặc người giám hộ của học sinh và các bên liên quan"
    },
    { 
        id: 11,
        group: 3,
        name: "Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện hoạt động dạy học cho học sinh",
        pass: "Cung cấp đầy đủ, kịp thời thông tin về tình hình học tập, rèn luyện của học sinh ở trên lớp; thông tin về chương trình, kế hoạch dạy học môn học và hoạt động giáo dục cho cha mẹ hoặc người giám hộ của học sinh và các bên có liên quan; tiếp nhận thông tin từ cha mẹ hoặc người giám hộ của học sinh và các bên có liên quan về tình hình học tập, rèn luyện của học sinh",
        good: "Chủ động phối hợp với đồng nghiệp, cha mẹ hoặc người giám hộ của học sinh và các bên liên quan trong việc thực hiện các biện pháp hướng dẫn, hỗ trợ và động viên học sinh học tập, thực hiện chương trình, kế hoạch dạy học môn học và hoạt động giáo dục",
        veryGood: "Giải quyết kịp thời các thông tin phản hồi từ cha mẹ hoặc người giám hộ của học sinh và các bên liên quan về quá trình học tập, rèn luyện và thực hiện chương trình, kế hoạch dạy học môn học và hoạt động giáo dục của học sinh"
    },
    { 
        id: 12,
        group: 3,
        name: "Phối hợp giữa nhà trường, gia đình, xã hội để thực hiện giáo dục đạo đức, lối sống cho học sinh",
        pass: "Tham gia tổ chức, cung cấp thông tin về nội quy, quy tắc văn hóa ứng xử của nhà trường cho cha mẹ hoặc người giám hộ của học sinh và các bên liên quan; tiếp nhận thông tin từ cha mẹ hoặc người giám hộ của học sinh và các bên liên quan về đạo đức, lối sống của học sinh",
        good: "Chủ động phối hợp với đồng nghiệp, cha mẹ hoặc người giám hộ của học sinh và các bên liên quan trong thực hiện giáo dục đạo đức, lối sống cho học sinh",
        veryGood: "Giải quyết kịp thời các thông tin phản hồi từ cha mẹ hoặc người giám hộ của học sinh và các bên liên quan về giáo dục đạo đức, lối sống cho học sinh"
    },
    { 
        id: 13,
        group: 4,
        name: "Sử dụng ngoại ngữ hoặc tiếng dân tộc",
        pass: "Có thể sử dụng được các từ ngữ giao tiếp đơn giản bằng ngoại ngữ (ưu tiên tiếng Anh) hoặc ngoại ngữ thứ hai (đối với giáo viên dạy ngoại ngữ) hoặc tiếng dân tộc đối với những vị trí việc làm yêu cầu sử dụng tiếng dân tộc",
        good: "Có thể trao đổi thông tin về những chủ đề đơn giản, quen thuộc hằng ngày hoặc chủ đề đơn giản, quen thuộc liên quan đến hoạt động dạy học, giáo dục (ưu tiên tiếng Anh) hoặc biết ngoại ngữ thứ hai (đối với giáo viên dạy ngoại ngữ) hoặc tiếng dân tộc đối với những vị trí việc làm yêu cầu sử dụng tiếng dân tộc",
        veryGood: "Có thể viết và trình bày đoạn văn đơn giản về các chủ đề quen thuộc trong hoạt động dạy học, giáo dục (ưu tiên tiếng Anh) hoặc ngoại ngữ thứ hai (đối với giáo viên dạy ngoại ngữ) hoặc tiếng dân tộc đối với những vị trí việc làm yêu cầu sử dụng tiếng dân tộc"
    },
    { 
        id: 14,
        group: 4,
        name: "Ứng dụng công nghệ thông tin, khai thác và sử dụng thiết bị công nghệ trong dạy học, giáo dục",
        pass: "Sử dụng được các phần mềm ứng dụng cơ bản, thiết bị công nghệ trong dạy học, giáo dục và quản lý học sinh theo quy định; hoàn thành các khóa đào tạo, bồi dưỡng, khai thác và ứng dụng công nghệ thông tin và các thiết bị công nghệ trong dạy học, giáo dục theo quy định",
        good: "Ứng dụng công nghệ thông tin và học liệu số trong hoạt động dạy học, giáo dục; cập nhật và sử dụng hiệu quả các phần mềm; khai thác và sử dụng thiết bị công nghệ trong hoạt động dạy học, giáo dục",
        veryGood: "Hướng dẫn, hỗ trợ đồng nghiệp nâng cao năng lực ứng dụng công nghệ thông tin; khai thác và sử dụng thiết bị công nghệ trong hoạt động dạy học, giáo dục tộc"
    }
];

export default surveyQuestionsData