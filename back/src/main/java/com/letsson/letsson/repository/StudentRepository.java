package com.letsson.letsson.repository;

import com.letsson.letsson.model.StudentDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentDao,Long> {
    StudentDao findByTel(String tel);
}
//jpa 이용해서 데이터 베이스에 저장된 정보에 접근하능 하게 만들어 준다.