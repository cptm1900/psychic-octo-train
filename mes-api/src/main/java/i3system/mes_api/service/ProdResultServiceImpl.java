package i3system.mes_api.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import i3system.mes_api.mapper.ProdResultMapper;
import i3system.mes_api.vo.ProdResultVO;

@Service
public class ProdResultServiceImpl implements ProdResultService {

	private final ProdResultMapper mapper;

	public ProdResultServiceImpl(ProdResultMapper mapper) {
		this.mapper = mapper;
	}

	// 실적 목록 조회
	@Override
	public List<ProdResultVO> getList(String lotId) {
		return mapper.selectList(lotId);
	}

	// 실적 등록
	@Override
	public ProdResultVO register(ProdResultVO vo) {
		if (isEmpty(vo.getLotId()) || isEmpty(vo.getItemId())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "로트 ID와 품목 ID를 입력하세요");
		}

		checkType(vo);

		// 같은 로트에 같은 품목이 이미 있으면 거부 (중복 등록 방지)
		if (mapper.countByLotAndItem(vo.getLotId(), vo.getItemId()) > 0) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 등록된 품목입니다");
		}

		mapper.insert(vo);
		return mapper.selectById(vo.getResultId());
	}

	// 실적 정정 (양품 ↔ 불량, 불량 사유 변경)
	@Override
	public ProdResultVO update(Long resultId, ProdResultVO vo) {
		ProdResultVO saved = mapper.selectById(resultId);
		if (saved == null) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "실적을 찾을 수 없습니다");
		}

		checkType(vo);

		vo.setResultId(resultId);
		mapper.update(vo);
		return mapper.selectById(resultId);
	}

	// 대시보드 집계 (전체, 양품, 불량 수 + 불량 사유별 건수)
	@Override
	public Map<String, Object> getSummary() {
		List<ProdResultVO> all = mapper.selectList(null);

		int good = 0;
		int bad = 0;
		Map<String, Integer> reasonCount = new LinkedHashMap<>();

		for (ProdResultVO vo : all) {
			if ("OK".equals(vo.getResultType())) {
				good++;
			} else {
				bad++;
				reasonCount.put(vo.getReason(), reasonCount.getOrDefault(vo.getReason(), 0) + 1);
			}
		}

		// 불량 사유를 건수 많은 순으로 정렬
		List<Map<String, Object>> defects = new ArrayList<>();
		for (String reason : reasonCount.keySet()) {
			Map<String, Object> row = new LinkedHashMap<>();
			row.put("reason", reason);
			row.put("count", reasonCount.get(reason));
			defects.add(row);
		}
		defects.sort((a, b) -> (int) b.get("count") - (int) a.get("count"));

		Map<String, Object> result = new LinkedHashMap<>();
		result.put("total", good + bad);
		result.put("good", good);
		result.put("bad", bad);
		result.put("defects", defects);
		return result;
	}

	// 판정 값 검사 : GOOD, BAD만 허용 / 불량이면 사유 필수 / 양품이면 사유 제거
	private void checkType(ProdResultVO vo) {
		String type = vo.getResultType();

		if (!"OK".equals(type) && !"NG".equals(type)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "판정 값이 올바르지 않습니다");
		}
		if ("NG".equals(type) && isEmpty(vo.getReason())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "불량 사유를 입력하세요");
		}
		if ("OK".equals(type)) {
			vo.setReason(null);
		}
	}

	private boolean isEmpty(String s) {
		return s == null || s.isBlank();
	}
}
