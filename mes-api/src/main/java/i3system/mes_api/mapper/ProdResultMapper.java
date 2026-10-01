package i3system.mes_api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import i3system.mes_api.vo.ProdResultVO;

@Mapper
public interface ProdResultMapper {

    public List<ProdResultVO> selectList(@Param("lotId") String lotId);

    public ProdResultVO selectById(@Param("resultId") Long resultId);

    public int countByLotAndItem(@Param("lotId") String lotId, @Param("itemId") String itemId);

    public void insert(ProdResultVO vo);

    public void update(ProdResultVO vo);
    
}
