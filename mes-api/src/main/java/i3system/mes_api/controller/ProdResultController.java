package i3system.mes_api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import i3system.mes_api.service.ProdResultService;
import i3system.mes_api.service.ProdResultServiceImpl;
import i3system.mes_api.vo.ProdResultVO;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
		"http://localhost:5173",
		"https://psychic-octo-train-green.vercel.app"
})
public class ProdResultController {

	private final ProdResultService service;

	public ProdResultController(ProdResultServiceImpl service) {
		this.service = service;
	}

	// 실적 목록 조회 GET /api/results?lotId=...
	@GetMapping("/results")
	public List<ProdResultVO> list(@RequestParam(required = false) String lotId) {
		return service.getList(lotId);
	}

	// 실적 등록 POST /api/results
	@PostMapping("/results")
	@ResponseStatus(HttpStatus.CREATED)
	public ProdResultVO register(@RequestBody ProdResultVO vo) {
		return service.register(vo);
	}

	// 실적 정정 PATCH /api/results/{resultId}
	@PostMapping("/results/{resultId}")
	public ProdResultVO update(@PathVariable Long resultId, @RequestBody ProdResultVO vo) {
		return service.update(resultId, vo);
	}

	// 대시보드 집계 GET /api/dashboard/summary
	@GetMapping("/dashboard/summary")
	public Map<String, Object> summary() {
		return service.getSummary();
	}
	
}
