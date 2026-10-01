package i3system.mes_api.vo;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProdResultVO {
	
	/** 실적 번호 */
	private Long resultId;
	/** 로트 ID */
	private String lotId;
	/** 제품 ID */
	private String itemId;
	/** 처리 결과 (OK:양품, NG:불량) */
	private String resultType;
	/** 불량 사유 */
	private String reason;
	/** 정정 여부 */
	private String editedYn;
	/** 처리 일시 */
	private LocalDateTime regDt;
	
}
