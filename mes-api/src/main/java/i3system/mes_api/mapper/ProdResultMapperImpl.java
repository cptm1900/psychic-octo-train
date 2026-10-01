package i3system.mes_api.mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import i3system.mes_api.vo.ProdResultVO;

/*
 * DB 연결 전 임시 클래스
 * 
 */
@Repository
public class ProdResultMapperImpl {

	// 임시 테이블 대용
	private List<ProdResultVO> store = new ArrayList<>();
	private long seq = 0;

	// 목록 조회 (로트 ID가 없으면 전체)
	public List<ProdResultVO> selectList(String lotId) {
		List<ProdResultVO> list = new ArrayList<>();
		for (ProdResultVO vo : store) {
			if (lotId == null || lotId.isEmpty() || vo.getLotId().contains(lotId)) {
				list.add(vo);
			}
		}
		return list;
	}

	// 실적 번호로 한 건 조회
	public ProdResultVO selectById(Long resultId) {
		for (ProdResultVO vo : store) {
			if (vo.getResultId().equals(resultId)) {
				return vo;
			}
		}
		return null;
	}

	// 같은 로트에 같은 품목이 몇 건 있는지 (중복 등록 체크용)
	public int countByLotAndItem(String lotId, String itemId) {
		int count = 0;
		for (ProdResultVO vo : store) {
			if (vo.getLotId().equals(lotId) && vo.getItemId().equals(itemId)) {
				count++;
			}
		}
		return count;
	}

	// 등록 (최신 건이 맨 앞에 오도록 0번 자리에 추가)
	public void insert(ProdResultVO vo) {
		seq++;
		vo.setResultId(seq);
		vo.setEditedYn("N");
		vo.setRegDt(LocalDateTime.now());
		store.add(0, vo);
	}

	// 정정 (판정 결과와 사유만 바꾸고 정정 표시)
	public void update(ProdResultVO vo) {
		ProdResultVO saved = selectById(vo.getResultId());
		if (saved != null) {
			saved.setResultType(vo.getResultType());
			saved.setReason(vo.getReason());
			saved.setEditedYn("Y");
		}
	}
}
