package i3system.mes_api.service;

import java.util.List;
import java.util.Map;

import i3system.mes_api.vo.ProdResultVO;

public interface ProdResultService {

	/**
	 * 실적 목록 조회
	 * 
	 * @param lotId
	 * @return
	 */
	List<ProdResultVO> getList(String lotId);

	/**
	 * 실적 등록
	 * 
	 * @param vo
	 * @return
	 */
	ProdResultVO register(ProdResultVO vo);

	/**
	 * 실적 정정 (양품 ↔ 불량, 불량 사유 변경)
	 * 
	 * @param resultId
	 * @param vo
	 * @return
	 */
	ProdResultVO update(Long resultId, ProdResultVO vo);

	/**
	 * // 대시보드 집계 (전체, 양품, 불량 수 + 불량 사유별 건수)
	 * 
	 * @return
	 */
	Map<String, Object> getSummary();

}
